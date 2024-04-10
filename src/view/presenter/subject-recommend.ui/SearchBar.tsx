import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  majorResultListState,
  isMatchUnivState,
  univSearchResultListState,
  selectedMajorIdState,
  majorResultLoadingState,
} from "../../../schema/states/SubjectRecommend";
import { SearchBarUx } from "../subject-recommend.ux/SearchBarUx";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CircularProgress from "@mui/material/CircularProgress";

const SearchBar: React.FC<SearchBarUx> = (ux) => {
  const isMatchUniv = useRecoilValue(isMatchUnivState);

  const univSearchList = useRecoilValue(univSearchResultListState);
  const majorResultList = useRecoilValue(majorResultListState);
  const isLoading = useRecoilValue(majorResultLoadingState);

  const [isShowList, setIsShowList] = useState<boolean>(true);

  const [selectedMajorId, setSelectedMajorId] =
    useRecoilState(selectedMajorIdState);

  return (
    <Box width="100%" sx={{ py: 2 }}>
      <div className="flex sm:flex-row flex-col sm:space-x-2 sm:space-y-0 space-y-1">
        <Autocomplete
          sx={{ width: "100%", maxWidth: 400 }}
          options={univSearchList}
          getOptionLabel={(option) => option.name}
          placeholder={"학교명을 입력해주세요."}
          onChange={(e, newValue) => {
            setSelectedMajorId(null);
            if (newValue) return ux.inputKeyword(newValue.id, "univ");
            return ux.inputKeyword("", "univ");
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="대학명 입력"
              onChange={(e) => {
                ux.inputKeyword(e.target.value, "univ");
              }}
              size={"small"}
            />
          )}
        />
        {isMatchUniv && (
          <TextField
            id="outlined-basic"
            label="학과명 입력"
            variant="outlined"
            placeholder={"학과명을 입력해주세요."}
            sx={{ width: "100%", maxWidth: 400 }}
            onChange={(e) => {
              setSelectedMajorId(null);
              ux.inputKeyword(e.target.value, "major");
            }}
            size={"small"}
          />
        )}
      </div>
      <div className="w-full flex justify-end">
        <Button
          sx={{
            p: 0,
            my: 1,
            fontSize: 12,
            minWidth: "unset",
          }}
          onClick={() => setIsShowList(!isShowList)}
        >
          {isShowList ? (
            <>
              <KeyboardArrowUpIcon fontSize={"small"} />
              숨기기
            </>
          ) : (
            <>
              <KeyboardArrowDownIcon fontSize={"small"} />
              학과 검색결과 보기
            </>
          )}
        </Button>
      </div>
      <Divider />
      {isLoading ? (
        <div className="w-full flex items-center justify-center mt-4">
          <CircularProgress />
        </div>
      ) : majorResultList.length ? (
        <Collapse in={isShowList}>
          <Paper
            sx={{
              maxHeight: 180,
              overflowY: "auto",
            }}
          >
            <List>
              {majorResultList.map((value) => (
                <ListItem sx={{ p: 0 }} key={value.id}>
                  <ListItemButton
                    onClick={() => {
                      ux.clickMajor(value.id);
                    }}
                    sx={{
                      py: 0,
                      bgcolor:
                        value.id === selectedMajorId
                          ? "primary.light"
                          : "background.paper",
                    }}
                  >
                    <ListItemText
                      id={`major-text-${value.id}`}
                      primary={`${value.name}`}
                      secondary={`${value.keyword}`}
                      primaryTypographyProps={{
                        sx: {
                          color:
                            value.id === selectedMajorId
                              ? "primary.main"
                              : undefined,
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Collapse>
      ) : (
        <>검색 결과가 존재하지 않습니다.</>
      )}
    </Box>
  );
};

export default SearchBar;
