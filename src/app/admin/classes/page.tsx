"use client";

import { Typography, Grid } from "@mui/material";
import PageContainer from "@/app/admin/components/container/PageContainer";
import DashboardCard from "@/app/admin/components/shared/DashboardCard";
import { IconSchool } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";




const SamplePage = () => {

  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (!userData.roles.includes("ROLE_ADMIN")) {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [router]);

  
  return (
    <PageContainer title="Sample Page" description="This is a Sample page">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard title="Classes">
            <div>
              <IconSchool size={48} strokeWidth={1.5} color="blue" />
              <Typography>Cette section est en cours de développement.</Typography>
            </div>
          </DashboardCard>
        </Grid>
        {/* Add more Grid items for other sections as needed */}
      </Grid>
    </PageContainer>
  );
};

export default SamplePage;
