import { Prisma } from "@prisma/client";
import { Request } from "express";
import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { TPaginationOptions } from "../../interfaces/pagination";
import {
  filterableSortBy,
  lostItemSearchAbleFields,
} from "./lostItem.constants";
import { TLostItemsFilterRequest } from "./lostItem.interface";

const createLostItem = async (req: Request & { user?: any }) => {
  const user = req.user;

  const payload = req.body;

  // const file = req.file as IFile;

  // if (file) {
  // 	const uploadToCloudinary = await imageUploader.uploadToCloudinary(file);
  // 	req.body.image = uploadToCloudinary?.secure_url;
  // }

  const result = await prisma.$transaction(async (tsx) => {
    const userData = await tsx.user.findUniqueOrThrow({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        createdAt: true,
        updatedAt: true,
      },
    });

    const categoryData = await tsx.foundItemCategory.findUniqueOrThrow({
      where: {
        id: payload.categoryId,
      },
    });

    const createLostItem = await tsx.lostItem.create({
      data: {
        ...payload,
        name: userData.name,
        email: user.email,
        userId: user.id,
      },
    });

    const responseObject = {
      ...createLostItem,
      user: userData,
      category: categoryData,
    };

    return responseObject;
  });

  return result;
};

const getLostItems = async (
  params: TLostItemsFilterRequest,
  options: TPaginationOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

  let sort;

  // filterableSortBy: ["foundItemName", "category"] -- sortby can be done only in these fields
  if (filterableSortBy.map((field) => field === sortBy).includes(true)) {
    sort = sortBy;
  } else {
    sort = "createdAt";
  }

  const andConditions: Prisma.LostItemWhereInput[] = [];

  const { searchTerm, ...itemsFilter } = params;

  if (params.searchTerm) {
    andConditions.push({
      OR: lostItemSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  // filter by category

  let categoryFilter = "";

  if ((itemsFilter as any).category) {
    categoryFilter = (itemsFilter as any).category;
  }

  const ss = Object.keys(itemsFilter);

  if (ss.length > 0 && ss.includes("category")) {
    andConditions.push({
      category: {
        name: {
          contains: categoryFilter,
          mode: "insensitive",
        },
      },
    });
  }

  delete (itemsFilter as any).category;

  if (Object.keys(itemsFilter).length > 0) {
    andConditions.push({
      AND: Object.keys(itemsFilter).map((key) => ({
        [key]: {
          equals: (itemsFilter as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.LostItemWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.lostItem.findMany({
    where: {
      itemFound: false,
      ...whereConditions,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          password: false,
          createdAt: true,
          updatedAt: true,
        },
      },
      category: true,
    },
    skip,
    take: limit,
    orderBy:
      sort === "category"
        ? { category: { name: sortOrder as any } }
        : { [sort]: sortOrder },
  });

  const total = await prisma.lostItem.count({
    where: {
      itemFound: false,
      ...whereConditions,
    },
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateLostItem = async (id: string, payload: any) => {
  const isLostItemExists = await prisma.lostItem.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.lostItem.update({
    where: {
      id,
    },
    data: {
      ...payload,
    },
  });
  return result;
};

const deleteLostItem = async (id: string) => {
  const isLostItemExists = await prisma.lostItem.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.lostItem.delete({
    where: {
      id,
    },
  });
  return result;
};

const changeLostItemFoundStatus = async (id: string) => {
  const isLostItemExists = await prisma.lostItem.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.lostItem.update({
    where: {
      id,
    },
    data: {
      itemFound: !isLostItemExists.itemFound,
    },
  });
  return result;
};

const myLostItems = async (user: any) => {
  const result = await prisma.lostItem.findMany({
    where: {
      userId: user.id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          password: false,
          createdAt: true,
          updatedAt: true,
        },
      },
      category: true,
    },
  });
  return result;
};

const getSingleLostItem = async (id: string) => {
  const result = await prisma.lostItem.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          password: false,
          createdAt: true,
          updatedAt: true,
        },
      },
      category: true,
    },
  });
  return result;
};

export const LostItemServices = {
  createLostItem,
  getLostItems,
  updateLostItem,
  deleteLostItem,
  changeLostItemFoundStatus,
  myLostItems,
  getSingleLostItem,
};
