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
} from "@mui/material";
import PageContainer from "@/app/admin/components/container/PageContainer";
import { IconUser } from "@tabler/icons-react";

type User = {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  role: string;
};

const EnseigantsPage = () => {
  const [teachers, setTeachers] = useState<User[]>([]);
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
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (!userData.roles.includes("ROLE_ADMIN")) {
        router.push("/");
      } else {
        setUser(userData);
        fetchTeachers(); // Fetch teachers when the component mounts
      }
    } else {
      router.push("/");
    }
  }, [router]);

  const fetchTeachers = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/all-teachers"
      );
      if (response.ok) {
        const data = await response.json();
        setTeachers(data);
      } else {
        setError("Failed to fetch teachers");
      }
    } catch (error) {
      setError("An error occurred while fetching teachers");
    }
  };

  // Handler for form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher({ ...newTeacher, [name]: value });
  };

  // Handler for form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTeacher),
      });
      if (response.ok) {
        const data = await response.json();
        setNewTeacher({
          nom: "",
          prenom: "",
          email: "",
          password: "",
          role: "TEACHER",
        }); // Clear the form after successful submission
        fetchTeachers(); // Fetch updated list of teachers
      } else {
        setError("Failed to add teacher");
      }
    } catch (error) {
      setError("An error occurred while adding teacher");
    }
  };

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
          Bonjour M. {user.nom} {user.prenom} (administrateur)
        </Typography>
        <br />
        <Typography variant="h5" gutterBottom>
          Les Enseignants
        </Typography>
        <List>
          {teachers.map((teacher, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <Avatar>
                  <IconUser />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={`${teacher.nom} ${teacher.prenom}`}
                secondary={teacher.email}
              />
            </ListItem>
          ))}
        </List>
        {error && <Typography color="error">{error}</Typography>}
        <Box component="form" onSubmit={handleFormSubmit} mt={4} p={2}>
          <Typography variant="h6">Ajouter un Nouvel Enseignant</Typography>
          <TextField
            label="Nom"
            name="nom"
            value={newTeacher.nom}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Prénom"
            name="prenom"
            value={newTeacher.prenom}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            value={newTeacher.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Mot de Passe"
            name="password"
            type="password"
            value={newTeacher.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Ajouter
          </Button>
        </Box>
      </div>
    </PageContainer>
  );
};

export default EnseigantsPage;
