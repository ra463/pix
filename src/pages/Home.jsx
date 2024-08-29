/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import "./Home.scss";
import { getAllData, getFilteredData } from "../features/apiCall";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header/Header";
import {
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
} from "@chakra-ui/table";
import { BiSortAlt2 } from "react-icons/bi";
import { FiAlertCircle } from "react-icons/fi";

const Home = () => {
  const dispatch = useDispatch();
  const { users, filterUsers } = useSelector((state) => state.data);
  console.log(users.length);

  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [arr, setArr] = useState([]);
  const [show, setShow] = useState(false);

  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const resultperpage = 10;
  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (gender === "") {
      const fetchData = async () => {
        setLoading(true);
        try {
          const skip = resultperpage * (currentPage - 1);
          await getAllData(dispatch, resultperpage, skip);

          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setHasMoreData(false);
        }
      };

      fetchData();
    }
  }, [currentPage, gender, dispatch]);

  useEffect(() => {
    if (gender !== "") {
      const fetchData = async () => {
        setLoading(true);
        try {
          await getFilteredData(dispatch, gender);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setHasMoreData(false);
        }
      };

      fetchData();
    }
  }, [gender, dispatch]);

  const loadMore = () => {
    if (gender && !loading) {
      setArr((prevArr) => [
        ...prevArr,
        ...filterUsers.slice(prevArr.length, prevArr.length + 10),
      ]);
    }
    if (!loading && hasMoreData) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    console.log("arr updated:", arr);
  }, [arr]);

  // Observe the IntersectionObserver for the load more button
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && hasMoreData) {
          loadMore();
        }
      },
      { threshold: 0.5 } // Adjust the threshold as needed
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loading, hasMoreData]);

  // Options for gender select fields
  const genderOptions = ["male", "female"];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter users based on gender
  const filteredUsers = gender !== "" ? arr : users;
  // console.log("filteredUsers", arr.length);

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortField === "") return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });

  // console.log(sortedUsers.length);

  return (
    <>
      <Header />
      <div className="tab">
        <div className="fields">
          <h1>Employees Table</h1>
          <div className="select">
            <FiAlertCircle
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
            />
            <span className={`${show ? "show" : "hide"}`}>
              United States was the only country in the data provided from API.
              So Its bydefault selected.
            </span>
            <select>
              <option value="All">United Sataes</option>
            </select>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Gender</option>
              {genderOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th onClick={() => handleSort("id")}>
                  ID <BiSortAlt2 />
                </Th>
                <Th>Image</Th>
                <Th onClick={() => handleSort("firstName")}>
                  Name <BiSortAlt2 />
                </Th>
                <Th onClick={() => handleSort("age")}>
                  Age <BiSortAlt2 />
                </Th>
                <Th>Demography</Th>
                <Th>Designation</Th>
                <Th>Location</Th>
              </Tr>
            </Thead>
            <Tbody>
              {sortedUsers &&
                sortedUsers.length > 0 &&
                sortedUsers.map((item, i) => (
                  <Tr key={i}>
                    <Td>{item.id}</Td>
                    <Td>
                      <img
                        src={item.image}
                        alt="profile"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                    </Td>
                    <Td>{`${item.firstName} ${item.lastName}`}</Td>
                    <Td>{item.age}</Td>
                    <Td>{item.gender}</Td>
                    <Td>{item.role}</Td>
                    <Td>{`${item.address?.city}, ${item.address?.country}`}</Td>
                  </Tr>
                ))}
              {gender && (
                <Tr ref={loadMoreRef}>
                  <Td colSpan="1" className="load">
                    {sortedUsers.length === 102 || 106
                      ? "No More Data"
                      : "Loading More Data..."}
                  </Td>
                </Tr>
              )}
              {!gender && (
                <Tr ref={sortedUsers.length === 208 ? null : loadMoreRef}>
                  <Td className="load" colSpan="1">
                    {sortedUsers.length === 208
                      ? "No More Data"
                      : "Loading More Data..."}
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Home;
