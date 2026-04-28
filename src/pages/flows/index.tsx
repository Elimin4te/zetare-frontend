import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';

import { motion } from 'framer-motion';
import { useIntl } from 'react-intl';

import BrandedLoader from 'components/BrandedLoader';
import IconByName from 'components/IconByName';
import { getSupabaseClientOrThrow } from 'lib/supabase/client';
import FlowsStateMessage from './FlowsStateMessage';

import { Refresh2, SearchNormal1 } from 'iconsax-react';

type FlowRow = {
  id: string;
  key: string;
  name: string;
  ref_schema: string;
  route: string;
  is_active: boolean;
  icon: string | null;
};

export default function FlowsLandingPage() {
  const theme = useTheme();
  const intl = useIntl();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const [flows, setFlows] = useState<FlowRow[]>([]);
  const [query, setQuery] = useState('');

  const fetchFlows = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = getSupabaseClientOrThrow();
      const { data, error: qErr } = await supabase.schema('app').from('flows').select('id,key,name,ref_schema,route,is_active,icon');
      if (qErr) throw qErr;
      setFlows((data ?? []) as FlowRow[]);
    } catch (e: unknown) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchFlows();
  }, [fetchFlows]);

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { staggerChildren: 0.06, delayChildren: 0.04 }
      }
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 10, scale: 0.98 },
      show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.22, ease: 'easeOut' } }
    }),
    []
  );

  const filteredFlows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return flows;
    return flows.filter((f) => f.name.toLowerCase().includes(q));
  }, [flows, query]);

  if (loading) {
    return <BrandedLoader fullScreen={false} minHeight={360} message={intl.formatMessage({ id: 'flows-loading' })} />;
  }

  return (
    <Stack spacing={2.5} sx={{ width: '100%' }}>
      <Stack spacing={1}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems={{ sm: 'center' }} justifyContent="space-between">
          <Box>
            <Typography variant="h3">{intl.formatMessage({ id: 'flows' })}</Typography>
            <Typography variant="body2" color="text.secondary">
              {intl.formatMessage({ id: 'flows-subtitle' })}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ width: { xs: '100%', sm: 'auto' } }}>
            <Box sx={{ flex: 1, minWidth: { sm: 320 } }}>
              <FormControl sx={{ width: '100%' }}>
                <OutlinedInput
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={intl.formatMessage({ id: 'flows-search-placeholder' })}
                  startAdornment={
                    <InputAdornment position="start" sx={{ mr: -0.5 }}>
                      <SearchNormal1 size={16} />
                    </InputAdornment>
                  }
                  sx={{
                    bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'common.white',
                    '& .MuiOutlinedInput-input': { p: 1.25 }
                  }}
                />
              </FormControl>
            </Box>

            <Button
              onClick={() => void fetchFlows()}
              variant="contained"
              color="primary"
              startIcon={<Refresh2 variant="Bulk" />}
              sx={{ textTransform: 'none', px: 2, py: 1.25, borderRadius: 2, whiteSpace: 'nowrap' }}
            >
              {intl.formatMessage({ id: 'reload' })}
            </Button>
          </Stack>
        </Stack>
      </Stack>

      {error ? (
        <FlowsStateMessage
          icon="Danger"
          title={intl.formatMessage({ id: 'flows-error-title' })}
          body={intl.formatMessage({ id: 'flows-error-body' })}
          actionLabel={intl.formatMessage({ id: 'reload' })}
          onAction={() => void fetchFlows()}
        />
      ) : flows.length === 0 ? (
        <FlowsStateMessage
          icon="FolderOpen"
          title={intl.formatMessage({ id: 'flows-empty-title' })}
          body={intl.formatMessage({ id: 'flows-empty' })}
          actionLabel={intl.formatMessage({ id: 'reload' })}
          onAction={() => void fetchFlows()}
        />
      ) : filteredFlows.length === 0 ? (
        <FlowsStateMessage
          icon="SearchNormal1"
          title={intl.formatMessage({ id: 'flows-no-matches-title' })}
          body={intl.formatMessage({ id: 'flows-no-matches-body' })}
        />
      ) : (
        <motion.div variants={containerVariants} initial="hidden" animate="show">
          <Grid container spacing={2}>
            {filteredFlows.map((flow) => (
              <Grid key={flow.id} item xs={12} sm={6} md={4} lg={3}>
                <motion.div variants={itemVariants}>
                  <Box
                    sx={{
                      cursor: 'pointer',
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 1.5,
                      bgcolor: theme.palette.background.paper,
                      p: 2.25,
                      transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: theme.customShadows.z1,
                        borderColor: theme.palette.primary.light
                      }
                    }}
                    onClick={() => navigate(flow.route)}
                  >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          display: 'grid',
                          placeItems: 'center',
                          borderRadius: 1.5,
                          bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'secondary.100',
                          color: theme.palette.primary.main
                        }}
                      >
                        <IconByName name={flow.icon} size={26} variant="Bulk" aria-label={flow.icon ?? undefined} />
                      </Box>
                      <Stack spacing={0.25} sx={{ minWidth: 0 }}>
                        <Typography variant="subtitle1" sx={{ lineHeight: 1.2 }} noWrap>
                          {flow.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" noWrap>
                          {flow.key}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      )}
    </Stack>
  );
}

