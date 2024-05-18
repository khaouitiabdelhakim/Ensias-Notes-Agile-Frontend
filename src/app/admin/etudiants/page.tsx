"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
} from '@mui/material';
import PageContainer from '@/app/components/container/PageContainer';
import { IconUser } from '@tabler/icons-react';

type User = {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  role: string;
};

const StudentsPage = () => {
  const [students, setStudents] = useState<User[]>([]);
  const [newStudent, setNewStudent] = useState<User>({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    role: 'STUDENT',
  });
  const [user, setUser] = useState({
    nom: '',
    prenom: '',
    email: '',
    roles: [],
  });
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (!userData.roles.includes('ROLE_ADMIN')) {
        router.push('/');
      } else {
        setUser(userData);
        fetchStudents(); // Fetch students when the component mounts
      }
    } else {
      router.push('/');
    }
  }, [router]);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/all-students');
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        setError('Failed to fetch students');
      }
    } catch (error) {
      setError('An error occurred while fetching students');
    }
  };

  // Handler for form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  // Handler for form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      });
      if (response.ok) {
        const data = await response.json();
        setNewStudent({ nom: '', prenom: '', email: '', password: '', role: 'STUDENT' }); // Clear the form after successful submission
        fetchStudents(); // Fetch updated list of students
      } else {
        setError('Failed to add student');
      }
    } catch (error) {
      setError('An error occurred while adding student');
    }
  };

  if (!user.nom) {
    return null; // Render nothing or a loading indicator while checking the user role
  }

  return (
    <PageContainer title="Étudiants" description="This shows the total of the students">
      <div>
        <Typography variant="h3" gutterBottom>
          Bonjour M. {user.nom} {user.prenom} (administrateur)
        </Typography>
        <br />
        <Typography variant="h5" gutterBottom>
          Les Étudiants
        </Typography>
        <List>
          {students.map((student, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <Avatar>
                  <IconUser />
                </Avatar>
              </ListItemIcon>
              <ListItemText primary={`${student.nom} ${student.prenom}`} secondary={student.email} />
            </ListItem>
          ))}
        </List>
        {error && <Typography color="error">{error}</Typography>}
        <Box component="form" onSubmit={handleFormSubmit} mt={4} p={2}>
          <Typography variant="h6">Ajouter un Nouvel Étudiant</Typography>
          <TextField
            label="Nom"
            name="nom"
            value={newStudent.nom}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Prénom"
            name="prenom"
            value={newStudent.prenom}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            value={newStudent.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Mot de Passe"
            name="password"
            type="password"
            value={newStudent.password}
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

export default StudentsPage;
