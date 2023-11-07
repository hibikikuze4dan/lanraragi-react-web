import React, { useCallback, useEffect, useState } from "react";
import { Grid, Rating as MUIRating, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import { getTagsObjectFromTagsString, stringifyTagsObject } from "../../utils";
import { getRatingType } from "../../storage/ratings";
import getArchiveMetaData, {
  updateArchiveMetadata,
} from "../../requests/metadata";
import { updateArchiveTags, updateDisplaySnackbar } from "../../app/slice";

export const Rating = ({
  readOnly,
  size = "large",
  arcId,
  archiveInfoProp = {},
  ratingProp,
}) => {
  const dispatch = useDispatch();
  const [archiveInfo, setArchiveInfo] = useState(archiveInfoProp);
  const tagsObject = getTagsObjectFromTagsString(archiveInfo?.tags ?? "");
  const ratingNamespace = getRatingType();
  const [ratingValue, setRatingValue] = useState(ratingProp ?? null);

  const onRatingChange = useCallback(
    (_, newValue) => {
      const newTagsObject = {
        ...tagsObject,
        [ratingNamespace]: [`${newValue}`],
      };
      const newTagsObjectAsString = stringifyTagsObject(newTagsObject);
      updateArchiveMetadata({
        id: archiveInfo?.arcid,
        title: archiveInfo?.title,
        tags: newTagsObjectAsString,
      })
        .then((res) => {
          if (res?.success === 1) {
            setRatingValue(newValue);
            dispatch(updateArchiveTags({ tags: newTagsObjectAsString }));
            dispatch(
              updateDisplaySnackbar({
                open: true,
                type: "UPDATE_ARCHIVE_INFO_SUCCESS",
              })
            );
          } else {
            updateDisplaySnackbar({
              open: true,
              type: "UPDATE_ARCHIVE_INFO_FAILURE",
              severity: "error",
            });
            console.log(
              res?.error ?? "Unknow error with updating archive info"
            );
          }
        })
        .catch((err) => {
          updateDisplaySnackbar({
            open: true,
            type: "UPDATE_ARCHIVE_INFO_FAILURE",
            severity: "error",
          });
          console.log(err ?? "Unknow error with updating archive info");
        });
    },
    [archiveInfo, tagsObject, ratingNamespace]
  );

  useEffect(() => {
    if (isEmpty(archiveInfo) && !readOnly) {
      getArchiveMetaData(arcId).then((res) => {
        const responseTagsObject = getTagsObjectFromTagsString(res?.tags ?? "");
        setArchiveInfo({ ...res });
        setRatingValue(Number(responseTagsObject?.[ratingNamespace]?.[0] ?? 0));
      });
    }
  }, [arcId, ratingNamespace, archiveInfo]);

  return (
    <Grid container justifyContent="center" spacing={2}>
      {!readOnly && (
        <Grid item sm={12}>
          <Typography>
            Click on any of the stars below to rate this archive. The rating
            will be saved to the archive&apos;s metadata in the Lanraragi
            database.
            <br />
            See the settings for different namespaces that can be used for
            saving the rating.
          </Typography>
        </Grid>
      )}
      <Grid item sm={12}>
        <MUIRating
          name={`archive-rating-for-${archiveInfo?.arcid}`}
          value={readOnly ? ratingProp : ratingValue}
          readOnly={!!readOnly}
          precision={0.5}
          onChange={readOnly ? null : onRatingChange}
          size={size}
        />
      </Grid>
    </Grid>
  );
};
