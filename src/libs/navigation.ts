import { NextRouter } from 'next/router';

export const navigate = (page: number, router: NextRouter) => {
    const { query } = router;
    const newQuery = { ...query, page };
    router.push({
        pathname: router.pathname,
        query: newQuery,
    });
};
