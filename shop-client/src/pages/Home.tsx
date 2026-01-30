import {
    Box,
    Fab,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
    Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filters, ShopCard } from '../components';
import { useAppContext } from '../context';
import { ShopService } from '../services';
import { ResponseArray, Shop } from '../types';

const Home = () => {
    const navigate = useNavigate();
    const { setLoading } = useAppContext();

    const [shops, setShops] = useState<Shop[] | null>(null);
    const [count, setCount] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [pageSelected, setPageSelected] = useState<number>(0);

    const [sort, setSort] = useState('');
    const [filters, setFilters] = useState('');
    const [label, setLabel] = useState('');
    const [searchInput, setSearchInput] = useState('');

    const getShops = () => {
        setLoading(true);

        let promisedShops: Promise<ResponseArray<Shop>>;

        if (label) {
            promisedShops = ShopService.getShopsByLabel(pageSelected, 9, label);
        } else if (sort) {
            promisedShops = ShopService.getShopsSorted(pageSelected, 9, sort);
        } else if (filters) {
            promisedShops = ShopService.getShopsFiltered(pageSelected, 9, filters);
        } else {
            promisedShops = ShopService.getShops(pageSelected, 9);
        }

        promisedShops
            .then((res) => {
                setShops(res.data.content);
                setCount(res.data.totalPages);
                setPage(res.data.pageable.pageNumber + 1);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        getShops();
    }, [pageSelected, sort, filters, label]);

    const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageSelected(value - 1);
    };

    const handleChangeSort = (event: SelectChangeEvent) => {
        setSort(event.target.value as string);
        setLabel('');
    };

    const handleSearch = () => {
        setPageSelected(0);
        setFilters('');
        setSort('');
        setLabel(searchInput);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>

            <Typography variant="h2">Les boutiques</Typography>

            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                <Fab variant="extended" color="primary" onClick={() => navigate('/shop/create')}>
                    <AddIcon sx={{ mr: 1 }} />
                    Ajouter une boutique
                </Fab>
            </Box>

            {/* SORT + SEARCH + FILTER */}
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', gap: 3 }}>

                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Trier par</InputLabel>
                    <Select value={sort} label="Trier par" onChange={handleChangeSort}>
                        <MenuItem value=""><em>Aucun</em></MenuItem>
                        <MenuItem value="name">Nom</MenuItem>
                        <MenuItem value="createdAt">Date</MenuItem>
                        <MenuItem value="nbProducts">Produits</MenuItem>
                    </Select>
                </FormControl>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        label="Rechercher une boutique"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />

                    <Button variant="contained" onClick={handleSearch}>
                        Rechercher
                    </Button>
                </Box>

                <Filters setUrlFilters={setFilters} setSort={setSort} sort={sort} />

            </Box>

            {/* SHOPS */}
            <Grid container rowSpacing={3} columnSpacing={3}>
                {shops?.map((shop) => (
                    <Grid item key={shop.id} xs={4}>
                        <ShopCard shop={shop} />
                    </Grid>
                ))}
            </Grid>

            {/* PAGINATION */}
            {shops?.length !== 0 ? (
                <Pagination count={count} page={page} onChange={handleChangePagination} />
            ) : (
                <Typography variant="h5">Aucune boutique correspondante</Typography>
            )}
        </Box>
    );
};

export default Home;
