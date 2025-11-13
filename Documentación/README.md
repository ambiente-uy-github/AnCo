# Modelo de ramas
Este modelo establece la semántica de las ramas para garantizar una trazabilidad clara y una integración coherente con nuestro ciclo de vida de desarrollo y entornos de despliegue.

## Principales características

1. Alineación con la Infraestructura
    
    La semántica de las ramas principales se alinea de manera estricta con nuestros entornos de despliegue, asegurando que el estado del código en el control de versiones refleje fielmente el estado del servicio en cada ambiente:
    * `main`: Código estable actualmente desplegado en el ambiente de `Producción` y en uso por los usuarios finales.
    * `test`: Código integrado y validado desplegado en el ambiente de `Testing`.
    * `develop`: Rama de integración principal. Representa la base consolidada para la próxima versión, utilizada para pruebas unitarias y desarrollo local. Ambiente de `integración continua / local`.
    
2. Mecanismos de control y seguridad

    Se implementan mecanismos de protección de ramas para asegurar la calidad y la revisión del código antes de su integración a las ramas principales.

    * **Bloqueo de Merges Directos:** El merge directo (push) a las ramas main, test, y develop está prohibido.
    * **Pull Request (PR) Obligatorio:** Toda integración de código a una rama principal debe realizarse exclusivamente a través de un Pull Request (PR).
    * **Requisito de Aprobación:** Cada PR requiere un mínimo de un (1) approval de un revisor autorizado para poder ser mergeado con la rama de destino.

# WIP  
## Semántica de Ramas

- `Feature/*/#idcard`
- `Fix/*/#idcard`
- `Setup/*/#idcard`
- `Hotfix/*/#idcard`

El `*` debe ser sustituido por un nombre que identifique las tareas realizadas en dicha rama. El #idcard representa el id de la tarjeta del backlog (si corresponde).
