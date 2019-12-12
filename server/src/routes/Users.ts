
import { User } from '@models';
import { logger, paramMissingError } from '@shared';
import { Request, Response, Router, Express } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

const router = Router();

/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {
    try {
        User.find({}, function (err, users) {
            if(err){ 
                return res.status(BAD_REQUEST).json({
                    error: err,
                });
            }

            return res.status(OK).json({users});
        });
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

router.post('/add', async (req: Request, res: Response) => {
    try {
        const { user } = req.body;

        //console.debug('/add', user);

        if (!user) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }

        const user_instance = new User(user);
        user_instance.save(function (err) {
            if(err){
                return res.status(BAD_REQUEST).json({
                    error: err,
                });
            }

            return res.status(CREATED).end();
        });
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                       Update - "PUT /api/users/update"
 ******************************************************************************/

router.put('/update', async (req: Request, res: Response) => {
    try {
        const { user } = req.body;
        if (!user) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }

        //console.debug("update", user);
        User.findByIdAndUpdate(user.id, user, function (err) {
            if(err){
                return res.status(BAD_REQUEST).json({
                    error: err,
                });
            }

            return res.status(OK).end();
        });
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                    Delete - "DELETE /api/users/delete/:id"
 ******************************************************************************/

router.delete('/delete/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params as ParamsDictionary;

        if (!id) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }

        User.findByIdAndRemove(id, function (err) {
            if(err){
                return res.status(BAD_REQUEST).json({
                    error: err,
                });
            }

            return res.status(OK).end();
        });
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
