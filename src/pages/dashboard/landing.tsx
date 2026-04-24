// project-imports
import DashboardHero from 'sections/dashboard/landing/Hero';
import DashboardFeatures from 'sections/dashboard/landing/Features';
import DashboardBenefits from 'sections/dashboard/landing/Benefits';
import DashboardKPIs from 'sections/dashboard/landing/KPIs';

// ==============================|| DASHBOARD LANDING PAGE ||============================== //

export default function DashboardLanding() {
  return (
    <>
      <DashboardHero />
      <DashboardFeatures />
      <DashboardBenefits />
      <DashboardKPIs />
    </>
  );
}
