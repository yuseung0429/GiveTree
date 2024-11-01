FROM openjdk:17-jdk
EXPOSE 8081
COPY build/libs/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
