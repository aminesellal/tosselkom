# Frontend Integration Guide

To connect your existing HTML pages to the backend, add the following `<script>` tags to the bottom of the `<body>` in each file.

## 1. Global Dependencies (All Pages)
Every page needs `config.js` and `api.js` before any other script.

```html
<script src="js/config.js"></script>
<script src="js/api.js"></script>
```

## 2. Page-Specific Scripts

### Login Page (`login.html`)
```html
<script src="js/config.js"></script>
<script src="js/api.js"></script>
<script src="js/auth.js"></script>
```

### Register Page (`register.html`)
```html
<script src="js/config.js"></script>
<script src="js/api.js"></script>
<script src="js/auth.js"></script>
```

### Client Dashboard (`client-dashboard.html`)
```html
<script src="js/config.js"></script>
<script src="js/api.js"></script>
<script src="js/auth.js"></script> <!-- For logout -->
<script src="js/client.js"></script>
```

### Create Order (`create-order.html`)
```html
<script src="js/config.js"></script>
<script src="js/api.js"></script>
<script src="js/client.js"></script>
```

### Courier Feed (`courier-feed.html`)
```html
<script src="js/config.js"></script>
<script src="js/api.js"></script>
<script src="js/auth.js"></script> <!-- For logout -->
<script src="js/courier.js"></script>
```

### Courier Deliveries (`courier-deliveries.html`)
```html
<script src="js/config.js"></script>
<script src="js/api.js"></script>
<script src="js/courier.js"></script>
```

### Order Details (`order-details.html`)
```html
<script src="js/config.js"></script>
<script src="js/api.js"></script>
<script src="js/order.js"></script>
```

### User Profile (`profile.html`)
*Note: You may need to create a `profile.js` or adapt `auth.js` to handle profile updates if not already covered.*

## 3. HTML Element IDs Requirement

Ensure your HTML elements have these IDs for the scripts to work:

- **Login/Register**: `loginForm`, `registerForm`, `email`, `password`, `fullName`, `phone`, `role`.
- **Create Order**: `createOrderForm`, `origine`, `destination`, `datePickup`, `poids`, `quantite`, `description`.
- **Containers**: `ordersContainer` (client dash), `feedContainer` (courier feed), `deliveriesContainer` (courier deliveries), `orderDetails`.
