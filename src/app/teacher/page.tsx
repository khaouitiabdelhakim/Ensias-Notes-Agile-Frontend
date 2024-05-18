"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
  ListItemIcon,
  Avatar,
  Grid,
} from "@mui/material";
import PageContainer from "@/app/components/container/PageContainer";
import { IconUser } from "@tabler/icons-react";
import DashboardCard from "../components/shared/DashboardCard";
import { IconSchool } from "@tabler/icons-react";

type User = {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  role: string;
};

const EnseigantsPage = () => {
  const [newTeacher, setNewTeacher] = useState<User>({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    role: "TEACHER",
  });
  const [user, setUser] = useState({
    nom: "",
    prenom: "",
    email: "",
    roles: [],
  });
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (!userData.roles.includes("ROLE_TEACHER")) {
        router.push("/");
      } else {
        setUser(userData);
      }
    } else {
      router.push("/");
    }
  }, [router]);

 




  if (!user.nom) {
    return null; // Render nothing or a loading indicator while checking the user role
  }

  return (
    <PageContainer
      title="Enseignants"
      description="This shows the total of the teachers"
    >
      <div>
        <Typography variant="h3" gutterBottom>
          Bonjour M. {user.nom} {user.prenom} (enseignant)
        </Typography>
        <br />
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard title="Enseignant">
            <div>
              <IconSchool size={48} strokeWidth={1.5} color="blue" />
              <Typography>Cette section est en cours de développement.</Typography>
            </div>
          </DashboardCard>
        </Grid>
        {/* Add more Grid items for other sections as needed */}
      </Grid>
      </div>
    </PageContainer>
  );
};

export default EnseigantsPage;
