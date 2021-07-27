import * as React from 'react';

import formatDate from 'date-fns/lightFormat';
import parseDate from 'date-fns/parseISO';

interface Til {
  title: string;
  published_at: string;
  url: string;
}

interface Props {
  posts: Til[];
}

function TodayILearnedPostsList({ posts }: Props) {
  return (
    <ul>
      {posts.map((til) => {
        return (
          <li key={til.url}>
            {formatDate(parseDate(til.published_at), 'yyyy-MM-dd')} ―{' '}
            <a href={til.url}>{til.title}</a>
          </li>
        );
      })}
    </ul>
  );
}

export default TodayILearnedPostsList;
