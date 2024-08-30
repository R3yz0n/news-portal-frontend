import React from "react";
import DBHeader from "../navbar/DBHeader";
import { Route, Routes } from "react-router-dom";
import Home from "../sidebar/home/Home";
// import Orders from "../sidebar/orders/Orders";
// import Users from "../sidebar/users/Users";
import Company from "../sidebar/company/Company";
import AddCompany from "../sidebar/company/AddCompany";
import CompanyDetails from "../sidebar/company/CompanyDetails";
import AddCategory from "../sidebar/category/AddCategory";
import Category from "../sidebar/category/Category";
import EditCategory from "../sidebar/category/EditCategory";
import AddPost from "../sidebar/posts/AddPost";
import Post from "../sidebar/posts/Post";
import AddUser from "../sidebar/users/AddUser";
import User from "../sidebar/users/User";
import EditPost from "../sidebar/posts/EditPost";
import EditUser from "../sidebar/users/EditUser";
import Advertisement from "../sidebar/advertisement/Advertisement";
import EditAdvertisement from "../sidebar/advertisement/EditAdvertisement";
import Client from "../sidebar/client/Client";
import AddClient from "../sidebar/client/AddClient";
import EditClient from "../sidebar/client/EditClient";

import Advertises from "../sidebar/advertises/Advertises";
import AddAdvertises from "../sidebar/advertises/AddAdvertises";

import Transactions from "../sidebar/transactions/Transactions";

import AddTransactions from "../sidebar/transactions/AddTransactions";

import ViewAdvertise from "../sidebar/advertises/ViewAdvertise";
import EditAdvertises from "../sidebar/advertises/EditAdvertises";

const DBRight = () => {
  return (
    <section className="  max-h-screen flex-1 overflow-y-auto bg-[rgb(235,235,235)]  px-8 pb-5 pt-3">
      <DBHeader />
      <div className="scrollbar-none flex flex-1 flex-col ">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/post/add" element={<AddPost />} />
          <Route path="/post" element={<Post />} />
          <Route path="/post/:id" element={<EditPost />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/add" element={<AddUser />} />
          <Route path="/user/:id" element={<EditUser />} />

          <Route path="/client" element={<Client />} />
          <Route path="/client/add" element={<AddClient />} />
          <Route path="/client/:id" element={<EditClient />} />

          <Route path="/company" element={<Company />} />
          <Route path="/company/add" element={<AddCompany />} />
          <Route path="/company/:id" element={<CompanyDetails />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/add" element={<AddCategory />} />
          <Route path="/category/:id" element={<EditCategory />} />

          <Route path="/advertisement/" element={<Advertisement />} />
          <Route path="/advertisement/:id" element={<EditAdvertisement />} />

          <Route path="/advertises/" element={<Advertises />} />
          <Route path="/advertises/add" element={<AddAdvertises />} />
          <Route path="/advertises/view/:id" element={<ViewAdvertise />} />
          <Route path="/advertises/:id" element={<EditAdvertises />} />

          <Route path="/transactions" element={<Transactions />} />

          <Route path="/transactions/add" element={<AddTransactions />} />
        </Routes>
      </div>
    </section>
  );
};

export default DBRight;
