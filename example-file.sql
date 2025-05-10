with
    some_cte as (
        select
            a,
            b,
            c
        from
            d
    ),
    other_cte as (
        select
            e,
            f,
            g
        from
            h
    )
select
    col1 as col1_alias, -- col1 description
    col2,
    -- col3 description
    col3 -- col3 description
from
    some_cte;
