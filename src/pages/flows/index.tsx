import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { motion } from 'framer-motion';
import { useIntl } from 'react-intl';

import BrandedLoader from 'components/BrandedLoader';
import IconByName from 'components/IconByName';
import { getSupabaseClientOrThrow } from 'lib/supabase/client';
import FlowsStateMessage from './FlowsStateMessage';

import { Refresh2, SearchNormal1 } from 'iconsax-react';

type FlowRow = {
  id: string;
  flow_key: string;
  name: string;
  description: string;
  ref_schema: string;
  is_active: boolean;
  icon: string | null;
};

export default function FlowsPage() {
  const theme = useTheme();
  const intl = useIntl();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const [flows, setFlows] = useState<FlowRow[]>([]);
  const [query, setQuery] = useState('');
  const [refreshSeq, setRefreshSeq] = useState(0);

  const fetchFlows = useCallback(async () => {
    setRefreshSeq((s) => s + 1);
    setLoading(true);
    setError(null);
    try {
      const supabase = getSupabaseClientOrThrow();
      const { data, error: qErr } = await supabase.schema('app').from('flows').select('id,flow_key,name,description,ref_schema,is_active,icon');
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
    return flows.filter((f) => `${f.name} ${f.flow_key} ${f.description ?? ''}`.toLowerCase().includes(q));
  }, [flows, query]);

  return (
    <Stack spacing={3} sx={{ width: '100%', flexGrow: 1, minHeight: 0 }}>
        <Stack spacing={1}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }} justifyContent="space-between">
            <Stack spacing={1}>
              <Typography variant="h3">{intl.formatMessage({ id: 'flows' })}</Typography>
              <Typography variant="body2" color="text.secondary">
                {intl.formatMessage({ id: 'flows-subtitle' })}
              </Typography>
            </Stack>

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
                disabled={loading}
                startIcon={
                  loading ? <CircularProgress size={18} thickness={5} sx={{ color: 'common.white' }} /> : <Refresh2 variant="Bulk" />
                }
                sx={{ textTransform: 'none', px: 2, py: 1, borderRadius: 2, whiteSpace: 'nowrap' }}
              >
                {intl.formatMessage({ id: 'reload' })}
              </Button>
            </Stack>
          </Stack>
        </Stack>

      {loading ? (
        <BrandedLoader fullScreen={false} minHeight={360} message={intl.formatMessage({ id: 'flows-loading' })} />
      ) : error ? (
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
        <motion.div key={refreshSeq} variants={containerVariants} initial="hidden" animate="show">
          <Grid container spacing={2}>
            {filteredFlows.map((flow) => (
              <Grid key={flow.id} item xs={12} sm={6} lg={4}>
                <motion.div variants={itemVariants}>
                  <Box
                    component={motion.div}
                    initial="rest"
                    animate="rest"
                    whileHover="hover"
                    whileTap={{ scale: 0.99 }}
                    variants={{
                      rest: { y: 0 },
                      hover: { y: -2 }
                    }}
                    sx={{
                      overflow: 'visible',
                      cursor: 'pointer',
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 1.5,
                      bgcolor: theme.palette.background.paper,
                      p: 2,
                      minHeight: 92,
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
                      borderLeft: `3.5px solid ${theme.palette.primary.main}`,
                      '&:hover': {
                        boxShadow: theme.customShadows.z1,
                        borderColor: theme.palette.primary.light,
                        borderWidth: 1.5
                      }
                    }}
                    onClick={() => navigate(`/flows/${flow.flow_key}`)}
                  >
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%' }}>
                      <Box
                        sx={{
                          position: 'relative',
                          width: 52,
                          height: 52,
                          flexShrink: 0,
                          overflow: 'visible'
                        }}
                      >
                        <Box
                          component={motion.span}
                          aria-hidden
                          animate={{
                            scale: [1, 1.35],
                            opacity: [0.16, 0.4, 0]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeOut'
                          }}
                          sx={{
                            position: 'absolute',
                            inset: 0,
                            margin: 'auto',
                            width: 52,
                            height: 52,
                            borderRadius: 12,
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.35)}`,
                            boxSizing: 'border-box',
                            pointerEvents: 'none'
                          }}
                        />
                        <Box
                          sx={{
                            position: 'relative',
                            zIndex: 1,
                            minWidth: 52,
                            minHeight: 52,
                            display: 'grid',
                            placeItems: 'center',
                            borderRadius: 12,
                            bgcolor: theme.palette.background.default,
                            color: theme.palette.primary.main
                          }}
                        >
                          <IconByName name={flow.icon} size={26} variant="Bulk" aria-label={flow.icon ?? undefined} />
                        </Box>
                      </Box>
                      <Stack spacing={0.5} sx={{ minWidth: 0 }}>
                        <Typography variant="subtitle1" sx={{ lineHeight: 1.2 }} noWrap>
                          {flow.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            lineHeight: 1.65,
                            whiteSpace: 'normal',
                            overflowWrap: 'anywhere',
                            wordBreak: 'break-word'
                          }}
                        >
                          {flow.description}
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

