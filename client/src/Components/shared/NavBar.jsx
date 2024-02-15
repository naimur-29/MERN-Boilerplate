import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { RiMenu3Fill, RiCloseFill, RiXingLine } from "react-icons/ri";
import { MdOutlineNotifications } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logoutSuccessFully } from "../../Utils/Toasts";
import UseAuth from "../../Hooks/UseAuth";

const navLink = [
  {
    item: "Home",
    link: "/",
  },
  {
    item: "nav link 2",
    link: "/",
  },
  {
    item: "nav link 3",
    link: "/",
  },
  {
    item: "nav link 4",
    link: "/",
  },
];

const avatarItems = [
  {
    item: "User menu 1",
    link: "/",
  },
  {
    item: "User menu 2",
    link: "/",
  },
  {
    item: "User menu 3",
    link: "/",
  },
];

const NavBar = () => {
  const { toggleDarkMode, darkmode, user, logoutFunction } = UseAuth();

  const [toggleAvatar, setToggleAvatar] = useState(false);
  const [toggle, setToggle] = useState(false);

  console.log(user);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  // dark mode toggle
  const handleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    toggleDarkMode();
  };

  // logout function
  const handleLogout = () => {
    setToggleAvatar(!toggleAvatar);
    logoutFunction();
    logoutSuccessFully();
  };

  return (
    <div
      className={` navContainer  z-50 py-2.5  bg-gray-100 dark:bg-gray-400  fixed w-full drop-shadow-lg `}
    >
      <ToastContainer />
      <div className="navWrapper flex justify-between w-[98%] xsm:w-[97%] lg:w-[96%] m-auto items-center ">
        {/* nav left  */}
        <div className="navLeft  ">
          <div className="navLeftImg  ">
            <Link
              to={`/`}
              className="self-center cursor-pointer  font-semibold whitespace-nowrap "
            >
              <div className=" flex justify-center items-center  ">
                <div className="logo w-[2.1rem] h-[2.1rem] xsm:w-[2.6rem] xsm:h-[2.5rem] sm:w-[2.8rem] sm:h-[2.7rem]  rounded-md overflow-auto ">
                  <img
                    src="https://i.ibb.co/phpJRMB/rocket-1976107-640.png"
                    className="  w-full h-full "
                    alt=""
                  />{" "}
                </div>
                <p
                  className={`   text-gray-900 dark:text-white text-sm xsm:text-base lg:text-xl  CormorantFont  `}
                >
                  Logo name
                </p>
              </div>
            </Link>
          </div>
        </div>
        {/* nav left  */}

        {/* nav right  */}
        <div className="navRight  flex justify-between items-center  ">
          <div className="navLinks hidden md:flex  justify-center items-center   mr-1.5 ">
            {navLink.map((ele, ind) => (
              <NavLink
                key={ind}
                to={ele.link}
                className={`  ${
                  navLink.length - 1 === ind ? "mr-2" : "mr-5"
                } relative group  text-base lg:text-lg   text-gray-700 dark:text-[#E4F1FF] hover:text-blue-500    `}
              >
                {ele.item}

                <span className="absolute -bottom-[.15rem] left-0 w-0 h-[.14rem] bg-blue-400 group-hover:w-full group-hover:transition-all"></span>
              </NavLink>
            ))}
          </div>
          {/* !mobile view  */}

          <div className="notMobile  mr-1 flex justify-center items-center relative z-[10]  ">
            {/*  */}
            {/*  */}

            {user ? (
              <button
                id="dropdownUserAvatarButton"
                data-dropdown-toggle="dropdownAvatar"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                type="button"
                onClick={() => setToggleAvatar(!toggleAvatar)}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full "
                  src="/docs/images/people/profile-picture-3.jpg"
                  alt="user photo"
                />
              </button>
            ) : (
              <Link
                to={`/login`}
                className=" hidden md:block bg-gray-600 py-2 px-3 lg:px-4  text-white font-semibold text-xs lg:text-sm "
              >
                Log in
              </Link>
            )}

            {/* <!-- Dropdown menu --> */}

            {toggleAvatar && (
              <div
                id="dropdownAvatar"
                className="z-10 absolute  top-[9.3rem] -right-[6rem]  md:-right-[5.6rem]  transform -translate-x-1/2 -translate-y-1/2  bg-blue-200 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white cursor-pointer">
                  <div> {user?.displayName} </div>
                </div>
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownUserAvatarButton"
                >
                  <div className="avatarMenuItems  flex flex-col  ">
                    {avatarItems &&
                      avatarItems?.map((avatarMenu, ind) => (
                        <NavLink
                          key={ind}
                          to={avatarMenu.link}
                          onClick={() => setToggleAvatar(!toggleAvatar)}
                          className={`   px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white    `}
                        >
                          {avatarMenu.item}
                        </NavLink>
                      ))}
                  </div>
                  <li
                    className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleLogout()}
                  >
                    Sign out
                  </li>
                </ul>
              </div>
            )}

            {/*  */}
            {/*  */}
          </div>

          {/* !mobile view  */}

          {/* toggle button  */}
          <div
            className="toggleMode  pl-0 md:pl-2 mr-3 md:pr-0 text-xl sm:text-2xl  "
            onClick={() => handleDarkMode()}
          >
            {darkmode ? <BsFillMoonFill /> : <BsFillSunFill />}
          </div>
          {/* toggle button  */}

          {/*  */}
          {/* mobile view  */}

          <div className="mobileView flex md:hidden relative ">
            {/* menu icon  */}
            <div
              className="menuIcon text-lg xsm:text-xl sm:text-2xl "
              onClick={() => handleToggle()}
            >
              {!toggle ? <RiMenu3Fill /> : <RiCloseFill />}
            </div>
            {/* menu icon  */}

            {/* menu list  */}

            {toggle && (
              <div className="menuList text-center py-2 bg-[#183D3D] dark:bg-gray-300 absolute transform -translate-x-1/2 -translate-y-1/2 -right-[4.8rem] top-[6.3rem] sm:top-[6.7rem] w-[10rem] ">
                <div className="menuItem mb-4  ">
                  {navLink.map((ele, ind) => (
                    <div
                      key={ind}
                      className={` text-base ${
                        ind === navLink.length - 1 ? "pb-0" : "pb-3"
                      }  `}
                    >
                      <a
                        href={ele.link}
                        className="  cursor-pointer text-gray-50 dark:text-gray-900 "
                        onClick={() => handleToggle()}
                      >
                        {" "}
                        {ele.item}{" "}
                      </a>
                    </div>
                  ))}
                </div>

                {/* {user ? (
                <Link
                  className=" bg-amber-300 dark:bg-violet-500 rounded  py-1.5 px-5 text-gray-700 dark:text-white "
                  onClick={() => {
                    handleToggle();
                  }}
                >
                  Log out
                </Link>
              ) : (
                <Link
                  to={`/login`}
                  className=" bg-amber-300 dark:bg-violet-500 rounded   py-1.5 px-5 text-gray-700 dark:text-white "
                  onClick={() => handleToggle()}
                >
                  Log in
                </Link>
              )} */}
              </div>
            )}
            {/* menu list  */}
          </div>

          {/* mobile view  */}
        </div>
        {/* nav right  */}
      </div>
    </div>
  );
};

export default NavBar;
