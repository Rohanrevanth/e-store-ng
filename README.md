# E-Commerce Frontend Application

This is the frontend application for an e-commerce website, built using Angular. It provides a dynamic and interactive user interface for customers to browse products, manage their orders, and make purchases. The application communicates with the backend API (hosted locally at `http://localhost:8080`) to fetch and manage data.
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.2.

---

## Features

- **Product Browsing**: View product listings with details such as name, price, and description.
- **Order Management**: Place new orders, view order history, and track order details.
- **Discount Coupons**: Apply discount coupons during checkout.
- **Admin Dashboard**: Manage orders, view summary statistics, and analyze coupon usage.
- **Responsive Design**: Optimized for both desktop and mobile devices.

---

## Prerequisites

To run this application, ensure you have the following installed:

1. [Node.js](https://nodejs.org/) (v14 or later)
2. [Angular CLI](https://angular.io/cli) (v15 or later)

---

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Rohanrevanth/e-store-ng
   cd e-store-ng
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Start the Development Server:**

   ```bash
   ng serve
   ```

   The application will be accessible at `http://localhost:4200/`.

4. **Configure Backend API URL:**

   Update the `apiUrl` in the files of `src/app/service/` folder to match the backend API base URL:

---

## Project Structure

```
e-store-ng/
├── src/
│   ├── app/
│   │   ├── components/          # Reusable components (e.g., product card, navbar, etc.)
│   │   ├── pages/               # Page-level components (e.g., Home, Checkout, Admin Dashboard)
│   │   └── services/            # Angular services for API interactions
│   └── styles/                  # Global SCSS styles
├── angular.json                 # Angular configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # Project documentation
```

---

## Key Components

### Components

- **Product List:** Displays all available products.
- **Order Summary:** Shows order details, status, and payment information.
- **Admin Dashboard:** Offers insights into orders, products, and coupon statistics.

---

## Available Scripts

- **Run Development Server:**

  ```bash
  npm start
  ```

- **Run Unit Tests:**

  ```bash
  ng test
  ```

- **Build for Production:**

  ```bash
  ng build --prod
  ```

---

## Deployment

1. Build the project for production:

   ```bash
   ng build --prod
   ```

2. The output files will be available in the `dist/` folder. Host these files on any static hosting service such as [Netlify](https://www.netlify.com/), [Vercel](https://vercel.com/), or a custom web server.

---

## Backend Integration

Ensure the backend API (Go-based application) is running locally on `http://localhost:8080` or update the `apiUrl` in files of /services folder.

---

## Dependencies

- **Angular**: Core framework for building the application.
- **RxJS**: For handling asynchronous events and data streams.
- **Bootstrap**: For responsive and aesthetic design.
- **ngx-toastr**: For user notifications.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

