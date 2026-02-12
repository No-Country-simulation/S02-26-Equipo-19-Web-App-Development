# CACHE DE DEPENDENCIAS
FROM maven:3.9.12-eclipse-temurin-21-alpine AS deps
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline

# COMPILACIÓN
FROM maven:3.9.12-eclipse-temurin-21-alpine AS builder
WORKDIR /build
COPY --from=deps /root/.m2 /root/.m2
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# EJECUCIÓN
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /build/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]


