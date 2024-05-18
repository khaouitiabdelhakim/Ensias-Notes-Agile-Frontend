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

const StudentPage = () => {

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
      if (!userData.roles.includes("ROLE_STUDENT")) {
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
      title="Étudiants"
      description="Cette page montre les informations des étudiants"
    >
      <div>
        <Typography variant="h3" gutterBottom>
          Bonjour, {user.nom} {user.prenom} (étudiant)
        </Typography>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard title="Étudiant">
              <div>
                <IconSchool size={48} strokeWidth={1.5} color="blue" />
                <Typography>Cette section est en cours de développement.</Typography>
              </div>
            </DashboardCard>
          </Grid>
          {/* Ajouter plus de Grid items pour d'autres sections si nécessaire */}
        </Grid>
      </div>
    </PageContainer>
  );
};

export default StudentPage;
