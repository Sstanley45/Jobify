import { UnAuthenticatedError } from "../Errors/index.js";


const checkPermissions = (requestUser, resourceUserId) => {
    if (requestUser.userId === resourceUserId.toString()) return;
    throw new UnAuthenticatedError('not authorized to modify this job!')
}

export default checkPermissions;