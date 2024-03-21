{{/*
Expand the name of the chart.
*/}}
{{- define "penpalmap-front.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "penpalmap-front.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "penpalmap-front.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "penpalmap-front.labels" -}}
helm.sh/chart: {{ include "penpalmap-front.chart" . }}
{{ include "penpalmap-front.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "penpalmap-front.selectorLabels" -}}
app.kubernetes.io/name: {{ include "penpalmap-front.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "penpalmap-front.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "penpalmap-front.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Get the google secret.
*/}}
{{- define "penpalmap-front.google.secretName" -}}
{{- if .Values.config.google.existingSecret -}}
    {{- printf "%s" (tpl .Values.config.google.existingSecret $) -}}
{{- else -}}
    {{- printf "%s-%s" (include "penpalmap-front.fullname" .) "google" -}}
{{- end -}}
{{- end -}}

{{/*
Get the google client id key.
*/}}
{{- define "penpalmap-front.google.clientIdKey" -}}
{{- if .Values.config.google.existingSecret -}}
    {{- if .Values.config.google.secretKeys.clientId -}}
        {{- printf "%s" (tpl .Values.config.google.secretKeys.clientId $) -}}
    {{- end -}}
{{- else -}}
    {{- "client-id" -}}
{{- end -}}
{{- end -}}

{{/*
Get the google secret id key.
*/}}
{{- define "penpalmap-front.google.secretIdKey" -}}
{{- if .Values.config.google.existingSecret -}}
    {{- if .Values.config.google.secretKeys.secretId -}}
        {{- printf "%s" (tpl .Values.config.google.secretKeys.secretId $) -}}
    {{- end -}}
{{- else -}}
    {{- "secret-id" -}}
{{- end -}}
{{- end -}}

{{/*
Return true if a secret object should be created
*/}}
{{- define "penpalmap-front.google.createSecret" -}}
{{- if not .Values.config.google.existingSecret -}}
    {{- true -}}
{{- end -}}
{{- end -}}