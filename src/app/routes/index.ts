import express from "express";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { ClaimRoutes } from "../modules/Claims/claim.routes";
import { FoundItemRoutes } from "../modules/FoundItem/foundItem.routes";
import { ItemCategoryRoutes } from "../modules/FoundItemCategory/itemCategory.routes";
import { LostItemRoutes } from "../modules/LostItem/lostItem.routes";
import { MetaRoutes } from "../modules/Meta/meta.routes";
import { ProfileRoutes } from "../modules/Profile/profile.routes";
import { UserRoutes } from "../modules/User/user.routes";

const router = express.Router();

const moduleRoutes = [
	{
		path: "/",
		route: AuthRoutes,
	},
	{
		path: "/found-item-categories",
		route: ItemCategoryRoutes,
	},
	{
		path: "/found-items",
		route: FoundItemRoutes,
	},
	{
		path: "/lost-items",
		route: LostItemRoutes,
	},
	{
		path: "/claims",
		route: ClaimRoutes,
	},
	{
		path: "/my-profile",
		route: ProfileRoutes,
	},
	{
		path: "/user",
		route: UserRoutes,
	},
	{
		path: "/meta",
		route: MetaRoutes,
	},
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
