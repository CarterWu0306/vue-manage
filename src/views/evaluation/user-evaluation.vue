<template>
  <div>
    <evaluation-card></evaluation-card>
    <evaluation-tab></evaluation-tab>
  </div>
</template>

<script>
import evaluationCard from './components/EvaluationCard'
import evaluationTab from './components/EvaluationTab'
export default {
  name: "UserEvaluationCard",
  components: {evaluationCard,evaluationTab}
}
</script>

<style scoped>

</style>
