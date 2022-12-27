//@ts-nocheck
import React, { useState } from "react";
import {
  Box,
  HStack,
  Icon,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import hospitalData, { hospitalType } from "../../constants/data";

const Home: React.FC = () => {
  const [modifiedData, setModifiedData] =
    useState<hospitalType[]>(hospitalData);
  const [currentNameSortType, setCurrentNameSortType] = useState("");
  const [currentAddressSortType, setCurrentAddressSortType] = useState("");
  const [currentAreaSortType, setCurrentAreaSortType] = useState("");
  const [sortObj, setSortObj] = useState({});

  const randomiseArray = (arr: hospitalType[]) => {
    const shuffled = arr
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    return shuffled;
  };

  const sortByProperty = (
    prop: keyof hospitalType,
    updateStateFunc: (val: string) => void,
    sortState: string
  ) => {
    let sortedData;
    const isItemPresent = sortState[prop];

    if (!isItemPresent) {
      setSortObj({ ...sortState, [prop]: "asc" });
      sortedData = modifiedData.sort((a, b) =>
        a[prop] > b[prop] ? 1 : b[prop] > a[prop] ? -1 : 0
      );
      setModifiedData(sortedData);
    } else {
      if (sortState[prop] === "asc") {
        sortedData = modifiedData.sort((a, b) =>
          a[prop] < b[prop] ? 1 : b[prop] < a[prop] ? -1 : 0
        );
        setSortObj({ ...sortState, [prop]: "dsc" });
        setModifiedData(sortedData);
      } else if (sortState[prop] === "dsc") {
        setSortObj({ ...sortState, [prop]: "" });
        setModifiedData(randomiseArray(hospitalData));
      }
    }
  };

  const sortTableByProperty = (prop: keyof hospitalType) => {
    let sortedData;

    if (prop === "Name") {
      if (!currentNameSortType) {
        setCurrentNameSortType("asc");
        sortedData = modifiedData.sort((a, b) =>
          a[prop] > b[prop] ? 1 : b[prop] > a[prop] ? -1 : 0
        );
        setModifiedData([...sortedData]);
      } else if (currentNameSortType === "asc") {
        setCurrentNameSortType("dsc");
        sortedData = modifiedData.sort((a, b) =>
          a[prop] < b[prop] ? 1 : b[prop] < a[prop] ? -1 : 0
        );
        setModifiedData([...sortedData]);
      } else if (currentNameSortType === "dsc") {
        setCurrentNameSortType("");
        setModifiedData(randomiseArray(hospitalData));
      }
    } else if (prop === "Address") {
      if (!currentAddressSortType) {
        setCurrentAddressSortType("asc");
        sortedData = modifiedData.sort((a, b) =>
          a[prop] > b[prop] ? 1 : b[prop] > a[prop] ? -1 : 0
        );
        setModifiedData([...sortedData]);
      } else if (currentAddressSortType === "asc") {
        setCurrentAddressSortType("dsc");
        sortedData = modifiedData.sort((a, b) =>
          a[prop] < b[prop] ? 1 : b[prop] < a[prop] ? -1 : 0
        );
        setModifiedData([...sortedData]);
      } else if (currentAddressSortType === "dsc") {
        setCurrentAddressSortType("");
        setModifiedData(randomiseArray(hospitalData));
      }
    }
  };

  const filterData = (text: string, property: keyof hospitalType) => {
    if (!text) {
      return setModifiedData(hospitalData);
    }
    const filteredData = modifiedData.filter((item) =>
      item[property].toString().toLowerCase().includes(text)
    );

    setModifiedData([...filteredData]);
  };

  return (
    <Box
      w="90%"
      h="80%"
      overflow="scroll"
      mx="auto"
      borderWidth={1}
      borderColor="#D5D5D5"
      rounded="md"
      mt="20"
      boxShadow="md"
      sx={{ "::-webkit-scrollbar": { display: "none" } }}
    >
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              {Object.keys(hospitalData[0]).map((item) => (
                <Th>
                  <HStack alignItems="center">
                    <Text
                      cursor="pointer"
                      mr="3"
                      onClick={() => sortByProperty(item, setSortObj, sortObj)}
                    >
                      {item}
                    </Text>
                    <Input
                      type="text"
                      w="60%"
                      placeholder="Filter By Name..."
                      onChange={(e) => filterData(e.target.value, "Name")}
                    />
                    {currentNameSortType && (
                      <Icon
                        as={
                          currentNameSortType === "asc"
                            ? AiFillCaretUp
                            : AiFillCaretDown
                        }
                        color="#7D8492"
                      />
                    )}
                  </HStack>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {modifiedData.map((item, idx) => (
              <Tr key={idx}>
                <Td>{item.Name}</Td>
                <Td>{item.Area}</Td>
                <Td>{item.Address}</Td>
                <Td>{item.Type}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Home;
