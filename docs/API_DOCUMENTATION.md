# CalcHub AI – REST API Documentation

Base URL: `/api`

## Authentication Routes (`/api/auth`)
- `POST /register`: Register user `{ name, email, password }`
- `POST /login`: Authenticate user `{ email, password }` -> Returns `{ token, user }`
- `GET /me`: Get authenticated profile (Header `Authorization: Bearer <token>`)

## Calculator Routes (`/api/calculators`)
- `GET /`: List all 40+ calculators (Query params: `category`, `search`, `popular`)
- `GET /categories`: List 7 category metadata objects
- `GET /:slug`: Fetch calculator detail by slug

## History Routes (`/api/history`)
- `GET /`: Retrieve user calculation logs
- `POST /`: Save new calculation log `{ calculatorSlug, calculatorTitle, inputs, results }`
- `DELETE /clear`: Clear all user history
- `DELETE /:id`: Delete single history item

## AI Routes (`/api/ai`)
- `POST /explain`: Generate step-by-step mathematical breakdown `{ calculatorTitle, formula, inputs, results }`
- `POST /chat`: Interact with CalcHub AI Assistant `{ prompt, type, context }`

## Admin Routes (`/api/admin`)
- `GET /stats`: Retrieve system metrics (Admin token required)
- `GET /users`: Retrieve full user list (Admin token required)
- `POST /feedback`: Submit user feedback
- `POST /report`: Report bug or calculation issue
