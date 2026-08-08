# CalcHub AI – Database Schema Documentation

Database Engine: MongoDB (Mongoose ORM)

## Collections

### 1. `users`
- `_id`: ObjectId
- `name`: String
- `email`: String (Unique, Lowercase)
- `password`: String (Bcrypt Hash)
- `role`: Enum ('user', 'admin')
- `avatar`: String
- `createdAt`: Date

### 2. `calculators`
- `_id`: ObjectId
- `title`: String
- `slug`: String (Unique)
- `category`: String
- `description`: String
- `icon`: String
- `isPopular`: Boolean
- `usageCount`: Number

### 3. `histories`
- `_id`: ObjectId
- `userId`: ObjectId (Ref: User)
- `calculatorSlug`: String
- `calculatorTitle`: String
- `category`: String
- `inputs`: Object
- `results`: Object
- `formattedSummary`: String
- `createdAt`: Date

### 4. `favorites`
- `_id`: ObjectId
- `userId`: ObjectId (Ref: User)
- `calculatorSlug`: String
- `calculatorTitle`: String
- `category`: String
- `createdAt`: Date
