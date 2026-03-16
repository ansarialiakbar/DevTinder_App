# DevTinder Api
# authRouter
-POST /signup
-POST /login
-POST /logout

# profileRouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

# connectionRequestRouter
-POST /connection/send/intrested/:userId
-POST /connection/send/ignored/:userId
-POST /connecction/review/accecpted/:requestId
-POST /connection/review/rejected/:requestId

# userRouter
-GET /user/request
-GET /user/connection
-GET /user/feed -get the profile of other users
