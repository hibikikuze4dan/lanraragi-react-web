import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTags } from "../../requests/tags";
import { getAutocompleteTags } from "../../app/selectors";
import { updateTags } from "../../app/slice";

const getTagsAsync = async () => {
  const tagsArray = await getTags();
  return tagsArray;
};
export const useTagsFromLRRApi = () => {
  const dispatch = useDispatch();
  const tags = useSelector(getAutocompleteTags);

  useEffect(() => {
    if (!tags.length) {
      getTagsAsync().then((response) => {
        dispatch(updateTags(response));
      });
    }
  }, [tags]);

  return tags;
};
