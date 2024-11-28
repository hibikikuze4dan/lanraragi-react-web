import { Grid } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Archive from "../archive/archive";
import { ArchiveInfoDialog } from "../dialogs/archive-info-dialog";
import { getBaseUrl } from "../../storage/requests";
import { getCurrentArchiveId, getUsePaginatedSearch } from "../../app/selectors";
import { updateInfoDialogArchiveId } from "../../app/slice";
import { getNumArchivePerRow } from "../../storage/archives";
import { Loading } from "../loading/loading";
import { ArchiveEditDialog } from "../dialogs/archive-edit-dialog/archive-edit-dialog";
import { ArchiveRatingDialog } from "../dialogs/archive-rating-dialog/archive-rating-dialog";

export const ArchiveList = ({
  archives = [],
  sliceToRender = [0, null],
  isSearch = false,
  archivesLoading = false,
  loadingLabel = "",
  header = null,
  footer = null,
}) => {
  const dispatch = useDispatch();
  const currentArchiveId = useSelector(getCurrentArchiveId);
  const [archiveInfoModalState, updateArchiveInfoModalState] = useState({
    open: false,
    arcId: "",
  });
  const [archiveEditModalState, updateArchiveEditModalState] = useState({
    open: false,
    arcId: "",
  });
  const [archiveRatingModalState, updateArchiveRatingModalState] = useState({
    open: false,
    arcId: "",
  });
  const baseUrl = getBaseUrl();
  const columns = getNumArchivePerRow();
  const usePaginatedSearch = useSelector(getUsePaginatedSearch);
  const onInfoClick = useCallback((arcId) => {
    dispatch(updateInfoDialogArchiveId(arcId));
    updateArchiveInfoModalState({ open: true, arcId });
  }, []);
  const onEditClick = useCallback((arcId) => {
    updateArchiveEditModalState({ open: true, arcId });
    updateArchiveRatingModalState({ open: false, arcId });
  }, []);

  const displayArchives = !usePaginatedSearch && sliceToRender[1] !== null
    ? archives.slice(sliceToRender[0], sliceToRender[1])
    : archives;

  return (
    <div className="full-height overflow-y-scroll">
      <div className="pt-8 px-4 pb-[75svh]">
        {header}
        <Grid className="mt-0 mb-6" container columns={columns} spacing={2}>
          <div id="archives-top" />
          <Loading loading={archivesLoading} label={loadingLabel}>
            {displayArchives.map((archive, idx, arr) => {
              const { arcid, title, tags } = archive;
              return (
                <Archive
                  baseUrl={baseUrl}
                  currentArchiveId={currentArchiveId}
                  id={arcid}
                  index={idx}
                  isSearch={isSearch}
                  key={`${title}-${arcid}`}
                  numOfArchivesRendered={arr.length}
                  onEditClick={onEditClick}
                  onInfoClick={onInfoClick}
                  tags={tags}
                  title={title}
                />
              );
            })}
          </Loading>
        </Grid>
        {footer}
      </div>
      <ArchiveInfoDialog
        onClose={() =>
          updateArchiveInfoModalState({ ...archiveInfoModalState, open: false })
        }
        open={archiveInfoModalState.open}
        arcId={archiveInfoModalState.arcId}
      />
      <ArchiveEditDialog
        arcId={archiveEditModalState.arcId}
        onCloseProp={() =>
          updateArchiveEditModalState({ ...archiveEditModalState, open: false })
        }
        updateArchiveRatingModalState={updateArchiveRatingModalState}
        open={archiveEditModalState.open}
      />
      <ArchiveRatingDialog
        open={archiveRatingModalState.open}
        onClose={() =>
          updateArchiveRatingModalState({
            ...archiveRatingModalState,
            open: false,
          })
        }
        arcId={archiveRatingModalState.arcId}
      />
    </div>
  );
};
