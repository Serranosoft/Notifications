export const ui = {
    touch: {
        justifyContent: "center",
        paddingHorizontal: 16,
        borderRadius: 16,
        backgroundColor: "rgba(0,0,0,0.48)",
    },
    touchWrapper: {
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    img: {
        aspectRatio: 1,
        width: 35,
    },
    text: {
        fontFamily: "Hubhead",
        color: "white"
    }
}

export const modal = {
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "Hubhead",
        textAlign: "center",
    },
    wrapper: {
        width: "90%",
        height: "70%",
        padding: 16,
        gap: 16,
        backgroundColor: '#fafafa',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    button: {
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 50,
        shadowColor: '#000',
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 3,
        backgroundColor: "#fafafa",
        alignSelf: "center"
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
    },
    item: {
        flex: 1,
        margin: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: "white",
    },
    image: {
        aspectRatio: 1,
    }
}