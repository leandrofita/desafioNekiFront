import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/auth";
import "./styles.css";
import { StyledTableCell, StyledTableRow } from "./styleTable";

const HomePage = () => {
  const [skills, setSkills] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [skillId, setSkillId] = useState("");
  const [loadSkills, setLoadSkills] = useState(true);
  const [knowledgeLevel, setKnowledgeLevel] = useState("");
  //const [edicao, setEdicao] = useState(false);
  const [item, setItem] = useState("");
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { user, token, logout } = useContext(AuthContext);
  const URL = `http://localhost:8081/clients/${user.client.id}`;
  const PutDeleteURL = `http://localhost:8081/client-skills/`;
  const URLskills = `http://localhost:8081/skills`;
  const URLPostClientSkill = `http://localhost:8081/client-skills/`;
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (loadSkills) {
      getSkillsFromUser();
    }
    return () => setLoadSkills(false);
  }, [loadSkills]);

  const getSkillsFromUser = async () => {
    try {
      const response = await axios.get(URL, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setSkills(response.data.clientSkill);
        console.log("Get Status: ", response.status);
        console.log("Skills:", skills);
      } else {
        console.log("Erro na requisição");
      }
    } catch (error) {
      console.log("erro: ", error);
    }
  };

  const getSkills = async () => {
    try {
      let response = await axios.get(URLskills, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setSkillsList(response.data);
        console.log("Get Status: ", response.status);
      } else {
        console.log("Erro na requisição");
      }
    } catch (error) {
      console.log("erro: ", error);
    }
  };

  const postClientSkill = async (skillId, knowledgeLevel) => {
    try {
      let response = await axios.post(
        URLPostClientSkill,
        {
          idClient: user.client.id,
          idSkill: skillId,
          knowledgeLevel: knowledgeLevel,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        setLoadSkills(true);
        console.log("Get Status: ", response.status);
      } else {
        console.log("Erro na requisição");
      }
    } catch (error) {
      console.log("erro: ", error);
    }
  };
  const ShowDeleteAlert = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Você está prestes a deletar uma asssociação de skill",
      text: "Tem certeza que deseja fazer isso?",
      showCancelButton: true,
    }).then((response) => {
      if (response.isConfirmed) {
        handleDelete(id)

      }
    });

  }

  const handleDelete = async (id) => {
    
        try {
          let resultDel = await axios.delete(PutDeleteURL + id, {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          });
          console.log("result: ", resultDel);
          if (resultDel.status === 204) {
            Swal.fire({
              icon: "success",
              title: "Asssociação deletada com sucesso!"
            })
            let newSkills = [...skills];
            newSkills.splice(id, 1);
            setSkills(newSkills);
            setLoadSkills(true);
          } else {
            console.log("Erro de requisição");
          }
        } catch (error) {
          console.log("erro: ", error);
        }
     
  };

  const handleEdit = async (id, knowledgeLevel) => {
    if (id) {
      try {
        let result = await axios.put(
          PutDeleteURL + id,
          { knowledgeLevel: knowledgeLevel },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("result: ", result);
        if (result.status === 204) {
          setLoadSkills(true);
        } else {
          console.log("Erro de requisição");
        }
      } catch (error) {
        console.log("erro: ", error);
      }
    }
  };

  const clickItem = (item) => {
    setItem(item);
  };

  const showWarning = () => {
    Swal.fire({
      icon: "warning",
      title: "Você está prestes a sair",
      text: "Tem certeza que deseja sair?",
      showCancelButton: true,
    }).then((response) => {
      if (response.isConfirmed) {
        handleLogout();
      }
    });
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Container fluid id="container">
      <Box sx={{ flexGrow: 1, width: "103%" }}>
        <AppBar position="static" sx={{ color: "dark", bgcolor: "black" }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <img className="appBarLogo" src="\smallLogo.png" alt="logo" />
              <Button
                color="inherit"
                onClick={() => {
                  goBack();
                }}
                style={{ marginLeft: "1rem" }}
              >
                <p style={{ marginTop: "1rem", fontSize: "1.2rem" }}>Login</p>
              </Button>
            </Box>
            <a href="https://github.com/leandrofita">
              <img
                className="githubLogo"
                src="\githubLogo.png"
                alt="githubLogo"
              />
            </a>
            <Tooltip title="Sair">
            <Fab
              className="logoutIcon"
              color="warning"
              aria-label="logout"
              size="small"
            >
              <LogoutOutlinedIcon
                onClick={() => {
                  showWarning();
                }}
              />
            </Fab>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Box>

      {skills.length > 0 ? (
        <TableContainer
          component={Paper}
          style={{ maxWidth: "90%", marginTop: "1rem" }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Imagem</StyledTableCell>
                <StyledTableCell align="right">Nome</StyledTableCell>
                <StyledTableCell align="right">
                  Nível de conhecimento
                </StyledTableCell>
                <StyledTableCell align="right">Ações</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {skills.map((row, index) => (
                <StyledTableRow key={row.skill.id}>
                  <StyledTableCell component="th" scope="row">
                    <img className="logo" src={row.skill.imageUrl} alt="Logo" />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.skill.name}
                  </StyledTableCell>
                  <StyledTableCell align="right" sx={{ paddingRight: 10 }}>
                    {/* {editar(row.knowledgeLevel, index, edicao)} */}
                    {row.knowledgeLevel}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <div id="buttons">
                      <Fab
                        className="deleteIcon"
                        color="primary"
                        aria-label="delet"
                        size="small"
                      >
                        <DeleteIcon
                          onClick={() => {
                            ShowDeleteAlert(row.id);
                          }}
                        />
                      </Fab>
                      <Fab
                        className="editIcon"
                        color="secondary"
                        aria-label="edit"
                        size="small"
                      >
                        <EditIcon
                          onClick={() => {
                            clickItem(row.id);
                            setKnowledgeLevel(row.knowledgeLevel);
                            setOpen(true);
                          }}
                        />
                      </Fab>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <>
          <h1>:( Não há nada por aqui ainda...</h1>
          <p>Tente cadastrar uma associação de skill no botão abaixo!</p>
        </>
      )}

      <div className="actions" style={{ maxWidth: "90%" }}>
        <div className="regularButtons">
          <Button
            id="buttonVoltar"
            variant="contained"
            onClick={() => {
              goBack();
            }}
          >
            Voltar
          </Button>

          <Button
            id="buttonCarregar"
            variant="contained"
            color="secondary"
            onClick={() => {
              getSkillsFromUser();
            }}
          >
            Carregar
          </Button>
        </div>

        <Tooltip title="Adicionar associação de skill">
          <Fab
            id="addSkillButton"
            color="primary"
            aria-label="add"
            size="medium"
          >
            <AddIcon
              id="iconAddButton"
              onClick={() => {
                setOpenModal(true);
                setKnowledgeLevel("");
                getSkills();
              }}
            />
          </Fab>
        </Tooltip>
      </div>

      {/* MODAL DE ADIÇÃO */}

      <Dialog open={openModal}>
        <DialogTitle>Selecione a skill e o nível de conhecimento</DialogTitle>
        <Box sx={{ minWidth: 120 }}>
          <Stack spacing={5} className="formControl">
            {/* Input da skill */}
            <div className="formSkill">
              <FormControl className="formControlAdd">
                <InputLabel id="demo-simple-select-label">
                  <p style={{ fontSize: 20 }}>Selecione uma skill: </p>
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={skillId}
                  label=""
                  onChange={(e) => {
                    setSkillId(e.target.value);
                    console.log("Skill selecionada: ", skillId);
                  }}
                >
                  {skillsList.map((item, index) => (
                    <MenuItem value={item.id} key={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            {/* Input do knowledge level */}
            <div className="formKnowledge">
              <FormControl className="formControlAdd2">
                <InputLabel id="demo-simple-select-label">
                  <p style={{ fontSize: 20 }}>
                    Selecione o nível de conhecimento:{" "}
                  </p>
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select2"
                  value={knowledgeLevel}
                  label=""
                  onChange={(e) => {
                    setKnowledgeLevel(e.target.value);
                  }}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Stack>
        </Box>
        <div className="buttonDialog">
          <Button
            id="confirmButton"
            variant="contained"
            onClick={() => {
              postClientSkill(skillId, knowledgeLevel);
              setOpenModal(false);
              setLoadSkills(true);
            }}
          >
            Adicionar
          </Button>

          <Button
            id="cancelButton"
            variant="contained"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            Cancelar
          </Button>
        </div>
      </Dialog>

      {/* MODAL DE EDIÇÃO */}

      <Dialog open={open}>
        <DialogTitle>Selecione o novo nível de conhecimento</DialogTitle>
        <Box sx={{ minWidth: 120, display: "flex", justifyContent: "center" }}>
          <FormControl id="formControlEdit">
            <InputLabel id="demo-simple-select-label">
              <p style={{ fontSize: 20 }}>Nivel atual: {knowledgeLevel}</p>
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={knowledgeLevel}
              label=""
              onChange={(e) => {
                setKnowledgeLevel(e.target.value);
              }}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <div className="buttonDialog">
          <Button
            id="confirmButton"
            variant="contained"
            onClick={() => {
              handleEdit(item, knowledgeLevel);
              setOpen(false);
              setLoadSkills(true);
            }}
          >
            Confirmar edição
          </Button>

          <Button
            id="cancelButton"
            variant="contained"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancelar
          </Button>
        </div>
      </Dialog>
    </Container>
  );
};

export default HomePage;
