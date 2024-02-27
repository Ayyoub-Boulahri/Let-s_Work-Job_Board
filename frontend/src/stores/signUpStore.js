import { configureStore, createSlice } from "@reduxjs/toolkit";

const typeUserSlice = createSlice({
    name: "typeUser",
    initialState: { value: "employee" },
    reducers: {
        setCompany: (state) => {
            state.value = "company";
        },
        setEmployee: (state) => {
            state.value = "employee";
        }
    }
});

const employeeInitState = {
    value: {
        cin: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        dob: "",
        country: "",
        city: "",
        address: "",
        email: "",
        password: "",
        skills: [],
        experiences: [],
        degrees: [],
        cv: { name: "", blobObj: null },
        profilePhoto: null,
        aboutMe: ""
    }
}

const employeeSlice = createSlice({
    name: "employeeData",
    initialState: employeeInitState,

    reducers: {
        setPersonnelInfos: (state, action) => {
            state.value.cin = action.payload.cin;
            state.value.firstName = action.payload.firstName;
            state.value.lastName = action.payload.lastName;
            state.value.phoneNumber = action.payload.phoneNumber;
            state.value.dob = action.payload.dob;
            state.value.country = action.payload.country;
            state.value.city = action.payload.city;
            state.value.address = action.payload.address;
        },
        setSecurityInfos: (state, action) => {
            state.value.email = action.payload.email;
            state.value.password = action.payload.password;
        },
        addSkill: (state, action) => {
            state.value.skills = [...state.value.skills, action.payload.skill];
        },
        removeSkill: (state, action) => {
            state.value.skills = state.value.skills.filter(e => e !== action.payload.skill);
        },
        addExperience: (state, action) => {
            state.value.experiences = [...state.value.experiences, action.payload];
        },
        removeExperience: (state, action) => {
            const experienceIdToRemove = action.payload.id_experience;
            state.value.experiences = state.value.experiences.filter(
                experience => experience.id_experience !== experienceIdToRemove
            );
        },
        addDegree: (state, action) => {
            state.value.degrees = [...state.value.degrees, action.payload]
        },
        removeDegree: (state, action) => {
            state.value.degrees = state.value.degrees.filter(e => e.id !== action.payload.id);
        },
        setCv: (state, action) => {
            state.value.cv = action.payload;
        },
        setProfilePhoto: (state, action) => {
            state.value.profilePhoto = action.payload;
        },
        setAboutMe: (state, action) => {
            state.value.aboutMe = action.payload
        },
        initEmployee: (state) => {
            state.value.cin = employeeInitState.value.cin;
            state.value.firstName = employeeInitState.value.firstName;
            state.value.lastName = employeeInitState.value.lastName;
            state.value.phoneNumber = employeeInitState.value.phoneNumber;
            state.value.dob = employeeInitState.value.dob;
            state.value.country = employeeInitState.value.country;
            state.value.city = employeeInitState.value.city;
            state.value.address = employeeInitState.value.address;
            state.value.email = employeeInitState.value.email;
            state.value.password = employeeInitState.value.password;
            state.value.skills = employeeInitState.value.skills;
            state.value.experiences = employeeInitState.value.experiences;
            state.value.degrees = employeeInitState.value.degrees;
            state.value.cv = employeeInitState.value.cv;
            state.value.profilePhoto = employeeInitState.value.profilePhoto;
            state.value.aboutMe = employeeInitState.value.aboutMe;
        }

    }
})

const companyInitState = {
    value: {
        companyName: "",
        phoneNumber: "",
        country: "",
        city: "",
        address: "",
        industry: "",
        foundedYear: null,
        size: "",
        email: "",
        password: "",
        description: "",
        file: { name: "", blobObj: null },
        profilePhoto: null,
        company_cover: null,
    }
}

const companySlice = createSlice({
    name: "companyData",
    initialState: companyInitState,

    reducers: {
        setcompanyInfos: (state, action) => {
            state.value.companyName = action.payload.companyName;
            state.value.phoneNumber = action.payload.phoneNumber;
            state.value.country = action.payload.country;
            state.value.city = action.payload.city;
            state.value.address = action.payload.address;
            state.value.foundedYear = action.payload.foundedYear;
            state.value.size = action.payload.size;
            state.value.industry = action.payload.industry;
        },
        setCompanySecurityInfos: (state, action) => {
            state.value.email = action.payload.email;
            state.value.password = action.payload.password;
        },
        setDescription: (state, action) => {
            state.value.description = action.payload
        },
        setCompanyProfilePhoto: (state, action) => {
            state.value.profilePhoto = action.payload;
        },
        setCompanyCoverPhoto: (state, action) => {
            state.value.company_cover = action.payload;
        },
        setFile: (state, action) => {
            state.value.file = action.payload;
        },
        initCompany: (state) => {
            state.value.companyName = companyInitState.value.companyName;
            state.value.phoneNumber = companyInitState.value.phoneNumber;
            state.value.country = companyInitState.value.country;
            state.value.city = companyInitState.value.city;
            state.value.address = companyInitState.value.address;
            state.value.foundedYear = companyInitState.value.foundedYear;
            state.value.size = companyInitState.value.size;
            state.value.industry = companyInitState.value.industry;
            state.value.email = companyInitState.value.email;
            state.value.password = companyInitState.value.password;
            state.value.description = companyInitState.value.description;
            state.value.file = companyInitState.value.file;
            state.value.profilePhoto = companyInitState.value.profilePhoto;
            state.value.company_cover = companyInitState.value.company_cover;
        }

    }
})

export const { setCompany, setEmployee } = typeUserSlice.actions;
export const {
    setPersonnelInfos,
    setSecurityInfos,
    addSkill,
    removeSkill,
    addExperience,
    removeExperience,
    addDegree,
    removeDegree,
    setCv,
    setProfilePhoto,
    setAboutMe,
    initEmployee
} = employeeSlice.actions;

export const {
    setcompanyInfos,
    setCompanySecurityInfos,
    setDescription,
    setCompanyProfilePhoto,
    setFile,
    initCompany,
    setCompanyCoverPhoto
} = companySlice.actions;

export const signUpStore = configureStore({
    reducer: {
        typeUser: typeUserSlice.reducer,
        employeeData: employeeSlice.reducer,
        companyData: companySlice.reducer,
    }
})