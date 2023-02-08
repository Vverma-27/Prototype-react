import React, { useEffect, useMemo, useState } from "react";
import supabase from "../../services/supabase";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./index.module.css";
import { IPerson } from "../../types";

// function getLang() {
//   if (navigator.languages != undefined) return navigator.languages[0];
//   return navigator.language;
// }

const AllocationScreen = () => {
  const [people, setPeople] = useState<{ value: string; label: string }[]>([]);
  const [projects, setProjects] = useState<{ value: string; label: string }[]>(
    []
  );
  const [person, setPerson] = useState<string>("");
  const [project, setProject] = useState<string>("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const createAllocation = async () => {
    const { error } = await supabase
      .from("allocations")
      .insert([{ person, project, from: startDate, to: endDate }]);
    if (!error) alert("Successfully created allocation");
    console.log("🚀 ~ file: index.tsx:27 ~ createAllocation ~ error", error);
  };
  const dayButtons = useMemo(() => {
    return [1, 2, 3, 4, 5].map((num) => {
      return (
        <button
          className={styles.button}
          onClick={() => {
            setEndDate(
              new Date(
                new Date(startDate).setDate(startDate.getDate() + num * 5)
              )
            );
          }}
          key={num}
        >
          {num * 5} Days
        </button>
      );
    });
  }, [startDate]);
  const weekButtons = useMemo(() => {
    return [1, 2, 3, 4, 5].map((num) => {
      return (
        <button
          className={styles.button}
          onClick={() => {
            setEndDate(
              new Date(
                new Date(startDate).setDate(startDate.getDate() + num * 7)
              )
            );
          }}
          key={num}
        >
          {num} Weeks
        </button>
      );
    });
  }, [startDate]);
  const monthButtons = useMemo(() => {
    return [1, 2, 3, 4, 5].map((num) => {
      return (
        <button
          className={styles.button}
          onClick={() => {
            setEndDate(
              new Date(new Date(startDate).setMonth(startDate.getMonth() + num))
            );
          }}
          key={num}
        >
          {num} Months
        </button>
      );
    });
  }, [startDate]);
  useEffect(() => {
    (async () => {
      try {
        let { data: people } = await supabase.from("people").select("*");
        console.log("🚀 ~ file: index.tsx:87 ~ people", people);
        if (people)
          setPeople(
            people?.map((person) => {
              return {
                value: person.shortname,
                label: `${person.shortname} ${person.firstname} ${person.lastname}`,
              };
            })
          );
        let { data: project } = await supabase.from("projects").select("*");
        console.log("🚀 ~ file: index.tsx:97 ~ project", project);
        if (project)
          setProjects(
            project?.map((projectArg) => {
              console.log(
                "🚀 ~ file: index.tsx:102 ~ project?.map ~ projectArg",
                projectArg
              );
              return {
                value: projectArg.shortname,
                label: `${projectArg.shortname} - ${
                  projectArg?.description
                    ?.split(" ")
                    ?.splice(0, 6)
                    ?.join(" ") || ""
                }${
                  (projectArg?.description?.split(" ")?.length > 6 && "...") ||
                  ""
                }`,
              };
            })
          );
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <section className={styles.container}>
      <button className={styles.button} onClick={() => supabase.auth.signOut()}>
        Log Out
      </button>
      <h1 className={styles.container_heading}>Allocate Talent</h1>

      <section className={styles.details_container}>
        <h2 className={styles.section_heading}>Select Details</h2>
        <section
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <section style={{ flex: 1 }}>
            <label className={styles.label}>Select Talent</label>
            <Select
              className={styles.select}
              options={people}
              isClearable={true}
              isSearchable={true}
              onChange={(e) => {
                setPerson(e.value);
              }}
              // defaultValue
            />
          </section>
          <section style={{ flex: 1 }}>
            <label className={styles.label}>Select Project</label>
            <Select
              className={styles.select}
              isClearable={true}
              isSearchable={true}
              onChange={(e) => {
                setProject(e.value);
              }}
              options={projects}
              // defaultValue
            />
          </section>
        </section>
      </section>
      <hr style={{ width: "100%", color: "#fff" }} />
      <section className={styles.project_container}>
        <h2 className={styles.section_heading}>Select Duration</h2>
        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "3vmax",
          }}
        >
          <section>
            <label className={styles.label}>Select Start Date</label>
            <DatePicker
              showIcon
              // locale={lang}
              selected={startDate}
              minDate={new Date()}
              className={styles.date_picker}
              onChange={(date: React.SetStateAction<Date>) => {
                if (startDate > endDate) {
                  setEndDate(date);
                }
                setStartDate(date);
              }}
            />
          </section>
          <section>
            <label className={styles.label}>Select Duration</label>
            <section className={styles.buttons_section}>{dayButtons}</section>
            <hr style={{ margin: "2vmin 0" }} />
            <section className={styles.buttons_section}>{weekButtons}</section>
            <hr style={{ margin: "2vmin 0" }} />
            <section className={styles.buttons_section}>{monthButtons}</section>
          </section>
          <section>
            <label className={styles.label}>Select End Date</label>
            <DatePicker
              showIcon
              // locale={lang}
              selected={endDate}
              className={styles.date_picker}
              minDate={startDate}
              onChange={(date: React.SetStateAction<Date>) => {
                if (date >= startDate) setEndDate(date);
              }}
            />
          </section>
        </section>
      </section>

      <button className={styles.submit} onClick={createAllocation}>
        Create Allocation
      </button>
    </section>
  );
};

export default AllocationScreen;
