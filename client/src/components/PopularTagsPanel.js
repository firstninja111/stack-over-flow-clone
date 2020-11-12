import { useQuery } from '@apollo/client';
import { GET_ALL_TAGS } from '../graphql/queries';
import { Link as RouterLink } from 'react-router-dom';

import { Divider, Typography, Chip, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useTagsPanelStyles } from '../styles/muiStyles';

const PopularTagsPanel = () => {
  const result = useQuery(GET_ALL_TAGS);
  const classes = useTagsPanelStyles();
  const theme = useTheme();
  const isNotDesktop = useMediaQuery(theme.breakpoints.down('sm'));

  if (isNotDesktop) return null;

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div className={classes.rootPanel}>
      <Divider orientation="vertical" flexItem />
      <div className={classes.content}>
        <Typography variant="h6">Popular Tags</Typography>
        <div className={classes.tagsWrapper}>
          {result.data.getAllTags.map((t) => (
            <div key={t.tagName}>
              <Chip
                label={
                  t.tagName.length > 12
                    ? t.tagName.slice(0, 12) + '...'
                    : t.tagName
                }
                variant="outlined"
                color="primary"
                size="small"
                component={RouterLink}
                to={`/tags/${t.tagName}`}
                className={classes.tag}
                clickable
              />
              <Typography
                color="secondary"
                variant="caption"
              >{` × ${t.count}`}</Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularTagsPanel;
