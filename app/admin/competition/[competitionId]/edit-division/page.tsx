'use client';
import React, { useState } from 'react';
import styles from './index.module.scss';
import { useGetCompetitionId } from '@/hooks/competition'; // 가정된 훅
import { useParams } from 'next/navigation';
import ButtonOnClick from '@/components/common/button/buttonOnClick'; // 가정된 컴포넌트

export default function DivisionEdit() {
  const params = useParams();
  const {
    data: competition,
    isLoading,
    isError,
  } = useGetCompetitionId({
    competitionId: params.competitionId as string,
    admin: true,
  });

  const [openUniforms, setOpenUniforms] = useState<{ [key: string]: boolean }>({});
  const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({});
  const [openBelts, setOpenBelts] = useState<{ [key: string]: boolean }>({});

  const toggleUniform = (uniform: string) => {
    setOpenUniforms((prev) => ({ ...prev, [uniform]: !prev[uniform] }));
  };

  const toggleCategory = (uniform: string, category: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [`${uniform}-${category}`]: !prev[`${uniform}-${category}`],
    }));
  };

  const toggleBelt = (uniform: string, category: string, belt: string) => {
    setOpenBelts((prev) => ({
      ...prev,
      [`${uniform}-${category}-${belt}`]: !prev[`${uniform}-${category}-${belt}`],
    }));
  };

  const handleEdit = (divisionId: string) => {
    console.log(`Edit division with id: ${divisionId}`);
    // Handle edit logic here
  };

  const handleDelete = (divisionId: string) => {
    console.log(`Delete division with id: ${divisionId}`);
    // Handle delete logic here
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading competition data</div>;
  }

  if (!competition) {
    return <div>Competition not found</div>;
  }

  const groupedDivisions = competition.divisions.reduce((acc, division) => {
    const { uniform, category, belt } = division;
    if (!acc[uniform]) acc[uniform] = {};
    if (!acc[uniform][category]) acc[uniform][category] = {};
    if (!acc[uniform][category][belt]) acc[uniform][category][belt] = [];
    acc[uniform][category][belt].push(division);
    return acc;
  }, {} as any);

  const renderDivisionRow = (division: any, index: number) => {
    const price = division.priceSnapshots[division.priceSnapshots.length - 1]?.price || '';
    const columns = [
      index + 1,
      division.category,
      division.uniform,
      division.gender,
      division.belt,
      division.weight,
      division.birthYearRangeStart,
      division.birthYearRangeEnd,
      price,
    ];

    return (
      <div key={division.id} className={styles.divisionRow}>
        {columns.map((column, i) => (
          <div key={i} className={styles.divisionCell}>
            {column}
          </div>
        ))}
        <div className={styles.divisionCell}>
          <ButtonOnClick
            type="filled"
            size="medium"
            color="blue"
            text="수정"
            onClick={() => handleEdit(division.id)}
          />
        </div>
        <div className={styles.divisionCell}>
          <ButtonOnClick
            type="outlined"
            size="medium"
            color="black"
            text="삭제"
            onClick={() => handleDelete(division.id)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      {Object.keys(groupedDivisions).map((uniform) => (
        <div key={uniform}>
          <div className={styles.uniformHeader} onClick={() => toggleUniform(uniform)}>
            {uniform}
          </div>
          {openUniforms[uniform] &&
            Object.keys(groupedDivisions[uniform]).map((category) => (
              <div key={category} className={styles.categoryWrapper}>
                <div
                  className={styles.categoryHeader}
                  onClick={() => toggleCategory(uniform, category)}
                >
                  {category}
                </div>
                {openCategories[`${uniform}-${category}`] &&
                  Object.keys(groupedDivisions[uniform][category]).map((belt) => (
                    <div key={belt} className={styles.beltWrapper}>
                      <div
                        className={styles.beltHeader}
                        onClick={() => toggleBelt(uniform, category, belt)}
                      >
                        {belt}
                      </div>
                      {openBelts[`${uniform}-${category}-${belt}`] && (
                        <div className={styles.divisionTable}>
                          <div className={styles.divisionRow}>
                            <div className={styles.divisionHeader}>Index</div>
                            <div className={styles.divisionHeader}>Category</div>
                            <div className={styles.divisionHeader}>Uniform</div>
                            <div className={styles.divisionHeader}>Gender</div>
                            <div className={styles.divisionHeader}>Belt</div>
                            <div className={styles.divisionHeader}>Weight</div>
                            <div className={styles.divisionHeader}>Birth Year Start</div>
                            <div className={styles.divisionHeader}>Birth Year End</div>
                            <div className={styles.divisionHeader}>Price</div>
                            <div className={styles.divisionHeader}>Edit</div>
                            <div className={styles.divisionHeader}>Delete</div>
                          </div>
                          {groupedDivisions[uniform][category][belt].map(
                            (division: any, index: number) => renderDivisionRow(division, index),
                          )}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
