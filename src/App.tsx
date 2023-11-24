import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "flowbite-react";
import { Table, Accordion } from "flowbite-react";
import axios from "axios";

interface ListI {
  name: string;
  detail: any;
}


// POKE API NOT CLEAR FOR ME, I'M BLOCKING FOR API FROM POKEAPI

function App() {
  const [list, setList] = useState<any[] | []>();

  const fetchData = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?offset=20&limit=20")
      .then(function (response) {
        // handle success
        const dt = [];
        response.data.results?.map((x: any) => (
          dt.push({
            name: x.name,
            detail: x.url
          })
        ))
        setList(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mx-[10%] mt-[3rem]">
      <Table>
        <Table.Head>
          <Table.HeadCell>Pokemon name</Table.HeadCell>
          <Table.HeadCell>Pokemon Image</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {list?.map((d: ListI, i: any) => (
            <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {d.name ?? '-'}
              </Table.Cell>
              <Table.Cell>
                <a
                  href="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Detail
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default App;
