"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  Users,
  Plus,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  Target,
  Award,
  Settings,
  Edit,
  Save,
  X,
} from "lucide-react"

interface Team {
  id: string
  name: string
  score: number
}

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

interface QuizStats {
  totalQuestions: number
  correctAnswers: { [teamId: string]: number }
  teamAnswerHistory: { [teamId: string]: (number | null)[] }
}

let sampleQuestions: Question[] = [
  {
    id: 1,
    question: "Türkiye'nin başkenti neresidir?",
    options: ["İstanbul", "Ankara", "İzmir", "Bursa"],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Dünya'nın en büyük okyanusu hangisidir?",
    options: ["Atlantik", "Hint", "Pasifik", "Arktik"],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: "1 + 1 = ?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "Hangi gezegen Güneş'e en yakındır?",
    options: ["Venüs", "Merkür", "Mars", "Dünya"],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "JavaScript hangi yılda oluşturulmuştur?",
    options: ["1993", "1995", "1997", "1999"],
    correctAnswer: 1,
  },
]

export default function QuizHomePage() {
  const [teams, setTeams] = useState<Team[]>([
    { id: "1", name: "Takım A", score: 0 },
    { id: "2", name: "Takım B", score: 0 },
    { id: "3", name: "Takım C", score: 0 },
    { id: "4", name: "Takım D", score: 0 },
  ])
  const [newTeamName, setNewTeamName] = useState("")
  const [quizStarted, setQuizStarted] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [questions, setQuestions] = useState<Question[]>(sampleQuestions)

  const addTeam = () => {
    if (newTeamName.trim()) {
      const newTeam: Team = {
        id: Date.now().toString(),
        name: newTeamName.trim(),
        score: 0,
      }
      setTeams([...teams, newTeam])
      setNewTeamName("")
    }
  }

  const removeTeam = (teamId: string) => {
    if (teams.length > 2) {
      setTeams(teams.filter((team) => team.id !== teamId))
    }
  }

  const updateTeamName = (teamId: string, newName: string) => {
    setTeams(teams.map((team) => (team.id === teamId ? { ...team, name: newName } : team)))
  }

  const startQuiz = () => {
    if (teams.length >= 2) {
      sampleQuestions = questions
      setQuizStarted(true)
    }
  }

  if (showAdminPanel) {
    return <AdminPanel questions={questions} setQuestions={setQuestions} onBack={() => setShowAdminPanel(false)} />
  }

  if (quizStarted) {
    return <QuizGame teams={teams} setTeams={setTeams} />
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Quiz Yarışması</h1>
            <Trophy className="h-8 w-8 text-primary" />
          </div>
          <p className="text-muted-foreground text-lg">Takımınızı kurun ve heyecan verici quiz yarışmasına katılın!</p>
          <Button variant="outline" size="sm" onClick={() => setShowAdminPanel(true)} className="mt-4">
            <Settings className="h-4 w-4 mr-2" />
            Yönetim Paneli
          </Button>
        </div>

        {/* Team Setup */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Takım Kurulumu
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add New Team */}
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="team-name">Yeni Takım Ekle</Label>
                <Input
                  id="team-name"
                  placeholder="Takım adını girin..."
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTeam()}
                />
              </div>
              <Button onClick={addTeam} className="mt-6">
                <Plus className="h-4 w-4 mr-2" />
                Ekle
              </Button>
            </div>

            {/* Teams List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teams.map((team, index) => (
                <Card key={team.id} className="border-2">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="text-sm">
                          {index + 1}
                        </Badge>
                        <Input
                          value={team.name}
                          onChange={(e) => updateTeamName(team.id, e.target.value)}
                          className="border-none p-0 h-auto text-base font-medium"
                        />
                      </div>
                      {teams.length > 2 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTeam(team.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Team Count Info */}
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-muted-foreground">
                Toplam <span className="font-semibold text-foreground">{teams.length}</span> takım
                {teams.length < 2 && (
                  <span className="text-destructive ml-2">(Quiz başlatmak için en az 2 takım gerekli)</span>
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quiz Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center">Quiz Bilgisi</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-muted-foreground">
                Quiz <span className="font-semibold text-foreground">{questions.length}</span> sorudan oluşuyor
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Start Quiz Button */}
        <div className="text-center">
          <Button
            onClick={startQuiz}
            disabled={teams.length < 2 || questions.length === 0}
            size="lg"
            className="text-lg px-8 py-3"
          >
            Quiz'i Başlat
          </Button>
        </div>
      </div>
    </div>
  )
}

function AdminPanel({
  questions,
  setQuestions,
  onBack,
}: {
  questions: Question[]
  setQuestions: (questions: Question[]) => void
  onBack: () => void
}) {
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
  })

  const addQuestion = () => {
    if (newQuestion.question && newQuestion.options?.every((opt) => opt.trim())) {
      const question: Question = {
        id: Math.max(...questions.map((q) => q.id), 0) + 1,
        question: newQuestion.question,
        options: newQuestion.options as string[],
        correctAnswer: newQuestion.correctAnswer || 0,
      }
      setQuestions([...questions, question])
      setNewQuestion({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
      })
    }
  }

  const updateQuestion = (updatedQuestion: Question) => {
    setQuestions(questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q)))
    setEditingQuestion(null)
  }

  const deleteQuestion = (questionId: number) => {
    setQuestions(questions.filter((q) => q.id !== questionId))
  }

  const updateNewQuestionOption = (index: number, value: string) => {
    const newOptions = [...(newQuestion.options || ["", "", "", ""])]
    newOptions[index] = value
    setNewQuestion({ ...newQuestion, options: newOptions })
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Quiz Yönetim Paneli</h1>
            <p className="text-muted-foreground">Soruları yönetin ve quiz ayarlarını düzenleyin</p>
          </div>
          <Button onClick={onBack} variant="outline">
            <X className="h-4 w-4 mr-2" />
            Geri Dön
          </Button>
        </div>

        <Tabs defaultValue="questions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="questions">Soru Yönetimi</TabsTrigger>
            <TabsTrigger value="settings">Quiz Ayarları</TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-6">
            {/* Add New Question */}
            <Card>
              <CardHeader>
                <CardTitle>Yeni Soru Ekle</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="question-text">Soru Metni</Label>
                  <Textarea
                    id="question-text"
                    placeholder="Sorunuzu buraya yazın..."
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[0, 1, 2, 3].map((index) => (
                    <div key={index}>
                      <Label htmlFor={`option-${index}`}>
                        Seçenek {String.fromCharCode(65 + index)}
                        {newQuestion.correctAnswer === index && (
                          <Badge variant="secondary" className="ml-2">
                            Doğru
                          </Badge>
                        )}
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id={`option-${index}`}
                          placeholder={`Seçenek ${String.fromCharCode(65 + index)}`}
                          value={newQuestion.options?.[index] || ""}
                          onChange={(e) => updateNewQuestionOption(index, e.target.value)}
                        />
                        <Button
                          variant={newQuestion.correctAnswer === index ? "default" : "outline"}
                          size="sm"
                          onClick={() => setNewQuestion({ ...newQuestion, correctAnswer: index })}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button onClick={addQuestion} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Soru Ekle
                </Button>
              </CardContent>
            </Card>

            {/* Existing Questions */}
            <Card>
              <CardHeader>
                <CardTitle>Mevcut Sorular ({questions.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {questions.map((question) => (
                    <QuestionCard
                      key={question.id}
                      question={question}
                      isEditing={editingQuestion?.id === question.id}
                      onEdit={() => setEditingQuestion(question)}
                      onSave={updateQuestion}
                      onCancel={() => setEditingQuestion(null)}
                      onDelete={() => deleteQuestion(question.id)}
                    />
                  ))}
                  {questions.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      Henüz soru eklenmemiş. Yukarıdaki formu kullanarak soru ekleyebilirsiniz.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Ayarları</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Doğru Cevap Puanı</Label>
                    <Input type="number" defaultValue="10" />
                  </div>
                  <div>
                    <Label>Yanlış Cevap Puanı</Label>
                    <Input type="number" defaultValue="0" />
                  </div>
                  <div>
                    <Label>Soru Süresi (saniye)</Label>
                    <Input type="number" defaultValue="30" />
                  </div>
                  <div>
                    <Label>Quiz Modu</Label>
                    <Select defaultValue="standard">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standart</SelectItem>
                        <SelectItem value="timed">Zamanlı</SelectItem>
                        <SelectItem value="elimination">Eleme</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Ayarları Kaydet
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quiz İstatistikleri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-primary">{questions.length}</p>
                    <p className="text-sm text-muted-foreground">Toplam Soru</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-primary">0</p>
                    <p className="text-sm text-muted-foreground">Oynanan Quiz</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-primary">0</p>
                    <p className="text-sm text-muted-foreground">Toplam Katılımcı</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-primary">0%</p>
                    <p className="text-sm text-muted-foreground">Ortalama Başarı</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function QuestionCard({
  question,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}: {
  question: Question
  isEditing: boolean
  onEdit: () => void
  onSave: (question: Question) => void
  onCancel: () => void
  onDelete: () => void
}) {
  const [editedQuestion, setEditedQuestion] = useState(question)

  const updateOption = (index: number, value: string) => {
    const newOptions = [...editedQuestion.options]
    newOptions[index] = value
    setEditedQuestion({ ...editedQuestion, options: newOptions })
  }

  if (isEditing) {
    return (
      <Card className="border-primary">
        <CardContent className="p-4 space-y-4">
          <div>
            <Label>Soru Metni</Label>
            <Textarea
              value={editedQuestion.question}
              onChange={(e) => setEditedQuestion({ ...editedQuestion, question: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {editedQuestion.options.map((option, index) => (
              <div key={index}>
                <Label>
                  Seçenek {String.fromCharCode(65 + index)}
                  {editedQuestion.correctAnswer === index && (
                    <Badge variant="secondary" className="ml-2">
                      Doğru
                    </Badge>
                  )}
                </Label>
                <div className="flex gap-2">
                  <Input value={option} onChange={(e) => updateOption(index, e.target.value)} />
                  <Button
                    variant={editedQuestion.correctAnswer === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => setEditedQuestion({ ...editedQuestion, correctAnswer: index })}
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button onClick={() => onSave(editedQuestion)} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Kaydet
            </Button>
            <Button onClick={onCancel} variant="outline" className="flex-1 bg-transparent">
              <X className="h-4 w-4 mr-2" />
              İptal
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>{question.question}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold mb-2">{question.question}</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className={`p-2 rounded border ${
                    index === question.correctAnswer
                      ? "border-secondary bg-secondary/10 text-secondary-foreground"
                      : "border-border"
                  }`}
                >
                  <span className="font-medium">{String.fromCharCode(65 + index)}:</span> {option}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 ml-4">
            <Button onClick={onEdit} variant="outline" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              onClick={onDelete}
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive bg-transparent"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function QuizGame({ teams, setTeams }: { teams: Team[]; setTeams: (teams: Team[]) => void }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [teamAnswers, setTeamAnswers] = useState<{ [teamId: string]: number | null }>({})
  const [showResults, setShowResults] = useState(false)
  const [allAnswersSubmitted, setAllAnswersSubmitted] = useState(false)
  const [quizFinished, setQuizFinished] = useState(false)
  const [quizStats, setQuizStats] = useState<QuizStats>({
    totalQuestions: sampleQuestions.length,
    correctAnswers: teams.reduce((acc, team) => ({ ...acc, [team.id]: 0 }), {}),
    teamAnswerHistory: teams.reduce((acc, team) => ({ ...acc, [team.id]: [] }), {}),
  })

  const currentQuestion = sampleQuestions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === sampleQuestions.length - 1

  const handleTeamAnswer = (teamId: string, answerIndex: number) => {
    setTeamAnswers((prev) => ({
      ...prev,
      [teamId]: answerIndex,
    }))
  }

  const checkAllAnswersSubmitted = () => {
    const submittedCount = Object.keys(teamAnswers).length
    return submittedCount === teams.length
  }

  const showQuestionResults = () => {
    if (!checkAllAnswersSubmitted()) {
      alert("Tüm takımlar cevap vermeden sonuçları gösteremezsiniz!")
      return
    }

    // Calculate scores and update statistics
    const updatedTeams = teams.map((team) => {
      const teamAnswer = teamAnswers[team.id]
      const isCorrect = teamAnswer === currentQuestion.correctAnswer
      return {
        ...team,
        score: team.score + (isCorrect ? 10 : 0),
      }
    })

    setQuizStats((prev) => ({
      ...prev,
      correctAnswers: teams.reduce((acc, team) => {
        const teamAnswer = teamAnswers[team.id]
        const isCorrect = teamAnswer === currentQuestion.correctAnswer
        return {
          ...acc,
          [team.id]: prev.correctAnswers[team.id] + (isCorrect ? 1 : 0),
        }
      }, {}),
      teamAnswerHistory: teams.reduce(
        (acc, team) => ({
          ...acc,
          [team.id]: [...prev.teamAnswerHistory[team.id], teamAnswers[team.id] ?? null],
        }),
        {},
      ),
    }))

    setTeams(updatedTeams)
    setShowResults(true)
    setAllAnswersSubmitted(true)
  }

  const nextQuestion = () => {
    if (isLastQuestion) {
      setQuizFinished(true)
    } else {
      setCurrentQuestionIndex((prev) => prev + 1)
      setTeamAnswers({})
      setShowResults(false)
      setAllAnswersSubmitted(false)
    }
  }

  if (quizFinished) {
    return <QuizResults teams={teams} quizStats={quizStats} />
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Progress */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Quiz Yarışması</h1>
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            Soru {currentQuestionIndex + 1} / {sampleQuestions.length}
          </Badge>
        </div>

        {/* Current Scores */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center">Anlık Skorlar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {teams.map((team) => (
                <div key={team.id} className="text-center p-3 bg-muted rounded-lg">
                  <h3 className="font-semibold text-sm mb-1">{team.name}</h3>
                  <p className="text-2xl font-bold text-primary">{team.score}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-center">{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={`p-4 border-2 rounded-lg ${
                    showResults
                      ? index === currentQuestion.correctAnswer
                        ? "border-secondary bg-secondary/10 text-secondary-foreground"
                        : "border-border bg-muted"
                      : "border-border bg-card hover:border-primary/50 cursor-pointer"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Badge variant={showResults && index === currentQuestion.correctAnswer ? "default" : "outline"}>
                      {String.fromCharCode(65 + index)}
                    </Badge>
                    <span className="font-medium">{option}</span>
                    {showResults && index === currentQuestion.correctAnswer && (
                      <CheckCircle className="h-5 w-5 text-secondary ml-auto" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Answer Sections */}
        {!showResults && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {teams.map((team) => (
              <Card key={team.id} className="border-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    {team.name}
                    {teamAnswers[team.id] !== undefined && <CheckCircle className="h-5 w-5 text-secondary" />}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {currentQuestion.options.map((option, index) => (
                      <Button
                        key={index}
                        variant={teamAnswers[team.id] === index ? "default" : "outline"}
                        onClick={() => handleTeamAnswer(team.id, index)}
                        className="justify-start"
                        disabled={allAnswersSubmitted}
                      >
                        <Badge variant="secondary" className="mr-2">
                          {String.fromCharCode(65 + index)}
                        </Badge>
                        {option}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Results Section */}
        {showResults && (
          <Card className="mb-6 border-secondary">
            <CardHeader>
              <CardTitle className="text-center text-secondary">Soru Sonuçları</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teams.map((team) => {
                  const teamAnswer = teamAnswers[team.id]
                  const isCorrect = teamAnswer === currentQuestion.correctAnswer

                  return (
                    <div
                      key={team.id}
                      className={`p-4 rounded-lg border-2 ${
                        isCorrect ? "border-secondary bg-secondary/10" : "border-destructive bg-destructive/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{team.name}</span>
                        <div className="flex items-center gap-2">
                          {isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-secondary" />
                          ) : (
                            <XCircle className="h-5 w-5 text-destructive" />
                          )}
                          <span className="font-bold">
                            {teamAnswer !== undefined ? String.fromCharCode(65 + teamAnswer) : "Cevapsız"}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{isCorrect ? "+10 puan" : "0 puan"}</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="text-center space-x-4">
          {!showResults ? (
            <Button onClick={showQuestionResults} size="lg" disabled={!checkAllAnswersSubmitted()}>
              Sonuçları Göster
            </Button>
          ) : (
            <Button onClick={nextQuestion} size="lg">
              {isLastQuestion ? "Quiz'i Bitir" : "Sonraki Soru"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

function QuizResults({ teams, quizStats }: { teams: Team[]; quizStats: QuizStats }) {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score)
  const winner = sortedTeams[0]
  const maxScore = quizStats.totalQuestions * 10
  const averageScore = teams.reduce((sum, team) => sum + team.score, 0) / teams.length

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Trophy className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-2">Quiz Tamamlandı!</h1>
          <p className="text-xl text-muted-foreground">Tebrikler tüm takımlara!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Winner Announcement */}
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center gap-2">
                <Award className="h-6 w-6" />
                Kazanan Takım
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-2">{winner.name}</h2>
              <p className="text-xl text-primary font-semibold mb-4">
                {winner.score} / {maxScore} Puan
              </p>
              <Progress value={(winner.score / maxScore) * 100} className="w-full h-3" />
              <p className="text-sm text-muted-foreground mt-2">
                Başarı Oranı: {Math.round((winner.score / maxScore) * 100)}%
              </p>
            </CardContent>
          </Card>

          {/* Quiz Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Quiz İstatistikleri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Toplam Soru:</span>
                <span className="font-semibold">{quizStats.totalQuestions}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Ortalama Skor:</span>
                <span className="font-semibold">{Math.round(averageScore)} puan</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">En Yüksek Skor:</span>
                <span className="font-semibold text-primary">{winner.score} puan</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Katılımcı Takım:</span>
                <span className="font-semibold">{teams.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Team Performance */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Takım Performans Analizi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {sortedTeams.map((team, index) => {
                const correctCount = quizStats.correctAnswers[team.id] || 0
                const accuracy = (correctCount / quizStats.totalQuestions) * 100

                return (
                  <div key={team.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant={index === 0 ? "default" : "secondary"} className="text-lg px-3 py-1">
                          {index + 1}
                        </Badge>
                        <div>
                          <h3 className="text-lg font-semibold">{team.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {correctCount} / {quizStats.totalQuestions} doğru cevap
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{team.score}</p>
                        <p className="text-sm text-muted-foreground">%{Math.round(accuracy)} başarı</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Performans</span>
                        <span>{Math.round(accuracy)}%</span>
                      </div>
                      <Progress value={accuracy} className="h-2" />
                    </div>

                    {/* Answer History */}
                    <div className="flex gap-1 flex-wrap">
                      {quizStats.teamAnswerHistory[team.id]?.map((answer, qIndex) => {
                        const question = sampleQuestions[qIndex]
                        const isCorrect = answer === question?.correctAnswer

                        return (
                          <div
                            key={qIndex}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                              answer === null
                                ? "bg-muted text-muted-foreground"
                                : isCorrect
                                  ? "bg-secondary text-secondary-foreground"
                                  : "bg-destructive text-destructive-foreground"
                            }`}
                            title={`Soru ${qIndex + 1}: ${
                              answer === null ? "Cevapsız" : isCorrect ? "Doğru" : "Yanlış"
                            }`}
                          >
                            {qIndex + 1}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Final Scoreboard */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Final Skor Tablosu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedTeams.map((team, index) => (
                <div
                  key={team.id}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    index === 0 ? "bg-primary/10 border-2 border-primary" : "bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Badge variant={index === 0 ? "default" : "secondary"} className="text-lg px-3 py-1">
                      {index + 1}
                    </Badge>
                    <div>
                      <span className="text-lg font-semibold">{team.name}</span>
                      <p className="text-sm text-muted-foreground">
                        {quizStats.correctAnswers[team.id]} / {quizStats.totalQuestions} doğru
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary">{team.score}</span>
                    <p className="text-sm text-muted-foreground">puan</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button onClick={() => window.location.reload()} size="lg">
            Yeni Quiz Başlat
          </Button>
        </div>
      </div>
    </div>
  )
}
