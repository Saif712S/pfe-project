package com.Candidature.Candidature.Entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set; // Importez la classe Set

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "OffreEmploi")
public class OffreEmploi implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long offreId;
    private String titre;
    @Enumerated(EnumType.STRING)
    private TypeOffre typeOffre;
    private Date datePost;
    private Date dateFin;
    private String description;
    private String username;

    @OneToMany(cascade = {CascadeType.REMOVE},mappedBy = "offreEmploi")
    @JsonIgnore
    private List<Candidature> candidatures;






}
