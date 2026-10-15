import { SERIES_LIST } from '../../../../lib/data/seriesData';
import WatchClient from './WatchClient';

export function generateStaticParams() {
  const params: { seriesSlug: string; episodeId: string }[] = [];
  SERIES_LIST.forEach((series) => {
    series.episodes.forEach((episode) => {
      params.push({
        seriesSlug: series.slug,
        episodeId: String(episode.id),
      });
    });
  });
  return params;
}

export default async function WatchPage({
  params,
}: {
  params: Promise<{ seriesSlug: string; episodeId: string }>;
}) {
  const { seriesSlug, episodeId } = await params;
  return <WatchClient seriesSlug={seriesSlug} episodeId={episodeId} />;
}
