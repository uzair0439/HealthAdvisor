import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import { Colors } from "../../global/Constants";
import { MainStyles } from "../../global/GlobalStyles";
import {
  getUserDataFromDB,
  uploadProfilePhoto,
  updateUserProfile,
} from "../../res/services";
import * as ImagePicker from "expo-image-picker";
import moment from "moment";
import CommonButton from "../../components/CommonButton";
import { ScrollView } from "react-native-gesture-handler";
import Header from "./components/Header";
import PasswordModal from "./components/PasswordModal";
import { Modal } from "react-native";

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [dataForUpload, setDataForUpload] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    _getUser();
  }, []);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);
  const _getUser = async () => {
    setLoading(true);
    getUserDataFromDB()
      .then((res) => {
        setUser(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const pickPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
  };
  const updateUser = () => {
    console.log(!image);
    if (!dataForUpload && !image) {
      return alert("Nothing to update");
    }
    if (image) {
      setLoading(true);
      const uploadImageUri = image.uri.replace("file:", "");
      console.log(image.path);
      const data = new FormData();
      data.append("file", {
        uri: uploadImageUri,
        name: user._id,
        type: image.type,
      });
      uploadProfilePhoto(data, user._id)
        .then((res) => {
          setLoading(false);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    if (dataForUpload) {
      setLoading(true);
      updateUserProfile(dataForUpload)
        .then((res) => {
          console.log(res);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Header navigation={navigation} user={user} />
        <Loader visible={loading} />
        <PasswordModal
          visible={modalVisible}
          setmodal={(mess) => {
            setModalVisible(false);
            alert(mess);
          }}
        />
        <View style={styles.titleContainer}>
          <Text style={MainStyles.title}>Profile</Text>
        </View>
        <View style={styles.contentContainer}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => pickPhoto()}
          >
            <Image
              style={{ height: "100%", width: "100%", borderRadius: 60 / 2 }}
              source={
                image
                  ? { uri: image.uri }
                  : require("../../assets/user.jpg") || {
                      uri: user.photo,
                    }
              }
            />
          </TouchableOpacity>
          <Input
            placeholder={user && user.name}
            onChange={(text) =>
              setDataForUpload({ ...dataForUpload, name: text })
            }
          />
          <Input
            placeholder={user && user.email}
            onChange={(text) =>
              setDataForUpload({ ...dataForUpload, email: text })
            }
          />
          <Input
            placeholder={user && moment(user.dateOfBirth).format("DD MM YYYY")}
          />
          <Input
            placeholder={user && user.height.toString()}
            onChange={(text) =>
              setDataForUpload({ ...dataForUpload, height: text })
            }
          />
          <Input
            placeholder={user && user.weight.toString()}
            onChange={(text) =>
              setDataForUpload({ ...dataForUpload, weight: text })
            }
          />
        </View>
        <View style={styles.buttonContainer}>
          <CommonButton
            title={"Change Password"}
            onPress={() => setModalVisible(true)}
            color={Colors.secondary}
          />
          <CommonButton
            title={"Update"}
            onPress={() => updateUser()}
            color={Colors.secondary}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.orange,
    height: Dimensions.get("window").height,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    borderWidth: 1,
    alignSelf: "center",
  },
  titleContainer: {
    flex: 0.1,
  },
  contentContainer: {
    flex: 0.7,
    width: "100%",
    justifyContent: "space-around",
  },
  buttonContainer: {
    flex: 0.15,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
