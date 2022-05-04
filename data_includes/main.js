PennController.ResetPrefix(null); // Initiates PennController
PennController.DebugOff()
PennController.Sequence( "consent" , "welcome" , "practiceA" , "practiceB" , "practiceC" , "practiceD" , "experiment" , "send" , "final" ) //or you can randomize the experiment

PennController( "consent",
	newHtml("consent", "IbexConsentThai2019.html")
    .print()
	,
	newButton("continue", "ไปยังหน้าถัดไป")
	.settings.right()
    .print()
    .wait(
        getHtml("consent").test.complete()
            .failure( getHtml("consent").warn() )
    )
	)
	
	
PennController( "welcome" ,
    defaultText
        .print()
    ,
    newText("<p>ยินดีต้อนรับค่ะ</p>")
    ,
    newText("<p>ในการทดลองนี้ ท่านจะต้องเลือกว่ารูปภาพรูปไหนในสองรูปตรงกับเสียงบรรยายนะคะ</p>")
	,
    newText("<p>การทดลองจะใช้เวลาประมาณ 10-15 นาทีค่ะ</p>")
    ,	
    //newText("<p>ท่านสามารถคลิกที่รูปภาพโดยตรง หรือกดปุ่ม <strong>F</strong> เพื่อเลือกรูปทางด้านซ้าย หรือกดปุ่ม <strong>J</strong> เพื่อเลือกรูปทางด้านขวาค่ะ</p>")
    //,
    newText("<p>โปรดกรอกอายุและเลือกเพศกำเนิดของท่าน และกดปุ่มยืนยันคำตอบสองครั้งค่ะ</p>")
    ,
    newTextInput("age")
		.settings.length(2)
        .print()
		.settings.log()
		.setVar( "age" )
    ,
    newText("อายุ")
		.settings.after( getTextInput("age") )
		.print()
	,
    newDropDown("GenderOptions", "")
		.settings.add("หญิง", "ชาย")
		.print()
		.settings.log()
		.setVar( "gender" )
	,
    newText("เพศกำเนิด")
    .settings.after( getDropDown("GenderOptions") )
    .print()
    ,
	newButton("validate", "ยืนยันคำตอบ")
        .print()
		.wait(
			getTextInput("age").test.text( /^\d\d$/ )
					.failure( newText("โปรดกรอกอายุของท่านด้วยค่ะ")
					.print())
			)
        .wait(
		getDropDown("GenderOptions").test.selected()
					.failure( newText("โปรดเลือกเพศกำเนิดของท่านด้วยค่ะ")
					.print())
			)
	,
	newText("<p><b>กรุณาใส่หูฟังและกดปุ่มเล่นเสียง เพื่อทดสอบว่าท่านได้ยินเสียงหรือไม่นะคะ</b></p>")
    ,
	newAudio("micTest1", "MicTest1.wav")
		.settings.once()
		.settings.log()
		.print()
	,
    newDropDown("micTestChoice", "")
		.settings.add("35", "87", "150", "200", "340")
		.print()
	,
    newText("<p>(1) เสียงที่ท่านได้ยินข้างต้นตรงกับเลขใดคะ</p>")
		.settings.after( getDropDown("micTestChoice") )
		.print()
    ,
	newAudio("micTest2", "MicTest2.wav")
		.settings.once()
		.settings.log()
		.print()
	,
    newDropDown("micTestChoice2", "")
		.settings.add("23", "56", "160", "367", "450")
		.print()
	,
    newText("<p>(2) เสียงที่ท่านได้ยินข้างต้นตรงกับเลขใดคะ</p>")
		.settings.after( getDropDown("micTestChoice2") )
		.print()
    ,
	newText("<p>เมื่อกรอกและเลือกคำตอบทั้งหมดแล้ว กดปุ่มด้านล่างสองครั้งเพื่อเริ่มต้นการทดลองค่ะ</p>")
	,
    newButton("start", "เริ่มต้นการทดลอง")
        .print()
		.wait(getDropDown("micTestChoice").test.selected("200")
				.failure( newText("โปรดกดฟังเสียงและเลือกคำตอบที่ตรงกับเสียงค่ะ")
				.print()))
		.wait(getDropDown("micTestChoice2").test.selected("56")
					.failure( newText("โปรดกดฟังเสียงและเลือกคำตอบที่ตรงกับเสียงค่ะ")
					.print()))
	,
	newVar("age")
        .settings.global()
        .set( getTextInput("age") )
	,
	newVar("gender", "")
        .settings.global()
        .set( getVar("gender") )
)
.log( "age" , getVar("age") )
.log( "gender" , getVar("gender") )


// Start typing your code here

PennController( "practiceA" ,
    newButton("start", "เริ่มฟังเสียง")
		.print()
		.wait()
		.remove()
    ,
	newAudio("instruc1", "Instruc01.wav")
        .play()
	,
    getAudio("instruc1")
       .wait("first")
    ,
	newTimer(250)
        .start()
        .wait()
    ,
	newAudio("instruc2", "Instruc02.wav")
        .play()
	,
    getAudio("instruc2")
       .wait("first")
    ,
	newTimer(1000)
        .start()
        .wait()
    ,
	newAudio("instruc3", "TryPracticing.wav")
        .play()
	,
    getAudio("instruc3")
       .wait("first")
    ,
	newTimer(2000)
        .start()
        .wait()
    ,
    newAudio("audPracticeA1", "A_01.wav")
        .play()
    ,
    newImage("ImageVisPracticeA1", "A_1.jpg")
        .settings.size(900,600)
    ,
    newCanvas(1250,500)
        .settings.add(   "center at 50%" , "middle at 50%" , getImage("ImageVisPracticeA1") )
        .print()
    ,
    getAudio("audPracticeA1")
       .wait("first")
    ,
	clear()
	,
	newTimer(500)
        .start()
        .wait()
    ,
    newAudio("audPracticeA", "A_02.wav")
        .play()
    ,
    newImage("ImageVisPracticeA", "A_2.jpg")
        .settings.size(600,400)
    ,
    newImage("Pcov", "Covered_Box.jpg")
        .settings.size(600,400)
    ,
	newImage("hiddenPracticeA", "A_3.jpg")
        .settings.size(600,400)
    ,
    newImage("larrow", "Left_Arrow.jpg")
        .settings.size(100,100)
    ,
    newImage("rarrow", "Right_Arrow.jpg")
        .settings.size(100,100)
    ,
    newCanvas(1250,500)
        .settings.add( 550 , 0 , getImage("larrow").settings.hidden() )
        .settings.add( 650 , 0 , getImage("rarrow").settings.hidden() )
        .settings.add(   0 , 100 , getImage("ImageVisPracticeA") )
        .settings.add( 650 , 100 , getImage("Pcov") )
        .print()
    ,
    getAudio("audPracticeA")
       .wait("first")
    ,
	newTimer(500)
        .start()
        .wait()
    ,
	newAudio("clickorpress", "ClickorPress.wav")
        .play()
    ,
    getAudio("clickorpress")
       .wait()
    ,
	newTimer(1000)
        .start()
        .wait()
    ,
    getImage("larrow").settings.visible()
	,
    newAudio("left", "Left.wav")
        .play()
    ,
	getAudio("left")
		.wait("first")
	,
    getImage("larrow").settings.hidden()
	,
	newTimer(1000)
        .start()
        .wait()
    ,
    getImage("rarrow").settings.visible()
	,
    newAudio("orright", "orRight.wav")
        .play()
    ,
	getAudio("orright")
		.wait("first")
	,
    getImage("rarrow").settings.hidden()
	,
    newSelector("selectA")
		.settings.once()
        .settings.add( getImage("ImageVisPracticeA") , getImage("Pcov") )
        .settings.keys(          "F"    ,          "J"   )
        .settings.log()
        .wait()
    ,
	newTimer(250)
        .start()
        .wait()
    ,
    getSelector("selectA")           // Test whether the target image was selected
        .test.selected( getImage("Pcov") )
        .success(
            newAudio("positive", "Correct.wav").play()   // Positive feedback if the test succeeds
                .wait()
        )
        .failure(
            newAudio("negative", "Incorrect.wav").play()   // Negative feedback if the test fails
                .wait()
        )
	,
    clear()
	,
    newCanvas(1250,500)
        .settings.add(   0 , 100 , getImage("ImageVisPracticeA") )
		.settings.add( 650 , 100 , getImage("hiddenPracticeA"))
        .print()
	,
	newTimer(250)
        .start()
        .wait()
    ,
    newAudio("correctRight", "CorrectRight.wav")
        .play()
    ,
	getAudio("correctRight")
		.wait("first")
	,
	newAudio("repeatA", "A_02.wav")
        .play()
    ,
	getAudio("repeatA")
		.wait("first")
	,
	newTimer(500)
        .start()
        .wait()
    ,
	newAudio("tryagain", "PracticeThreeMore.wav")
        .play()
    ,
    getAudio("tryagain")
       .wait("first")
	,
    newTimer(500)
        .start()
        .wait()
  )
  .log( "age" , getVar("age") )
  .log( "gender" , getVar("gender") )



PennController( "practiceB" ,
    newTimer(500)
        .start()
        .wait()
    ,
    newAudio("audPracticeB1", "B_01.wav")
        .play()
    ,
    newImage("ImageVisPracticeB1", "B_1.jpg")
        .settings.size(900,600)
    ,
    newCanvas(1250,500)
        .settings.add(   "center at 50%" , "middle at 50%" , getImage("ImageVisPracticeB1") )
        .print()
    ,
    getAudio("audPracticeB1")
       .wait("first")
    ,
	clear()
	,
	newTimer(500)
        .start()
        .wait()
    ,
    newAudio("audPracticeB", "B_02.wav")
        .play()
    ,
    newImage("ImageVisPracticeB", "B_2.jpg")
        .settings.size(600,400)
    ,
    newImage("Pcov", "Covered_Box.jpg")
        .settings.size(600,400)
    ,
	newImage("hiddenPracticeB", "B_3.jpg")
        .settings.size(600,400)
    ,
    newImage("larrow", "Left_Arrow.jpg")
        .settings.size(100,100)
    ,
    newImage("rarrow", "Right_Arrow.jpg")
        .settings.size(100,100)
    ,
    newCanvas(1250,500)
        .settings.add( 550 , 0 , getImage("larrow").settings.hidden() )
        .settings.add( 650 , 0 , getImage("rarrow").settings.hidden() )
        .settings.add(   0 , 100 , getImage("ImageVisPracticeB") )
        .settings.add( 650 , 100 , getImage("Pcov") )
        .print()
    ,
    getAudio("audPracticeB")
       .wait("first")
    ,
	newTimer(500)
        .start()
        .wait()
    ,
    getImage("larrow").settings.visible()
	,
    newAudio("left", "Left.wav")
        .play()
    ,
	getAudio("left")
		.wait("first")
	,
    getImage("larrow").settings.hidden()
	,
	newTimer(1000)
        .start()
        .wait()
    ,
    getImage("rarrow").settings.visible()
	,
    newAudio("orright", "orRight.wav")
        .play()
    ,
	getAudio("orright")
		.wait("first")
	,
    getImage("rarrow").settings.hidden()
	,
    newSelector("selectB")
		.settings.once()
        .settings.add( getImage("ImageVisPracticeB") , getImage("Pcov") )
        .settings.keys(          "F"    ,          "J"   )
        .settings.log()
        .wait()
    ,
	newTimer(250)
        .start()
        .wait()
    ,
    getSelector("selectB")           // Test whether the target image was selected
        .test.selected( getImage("ImageVisPracticeB") )
        .success(
            newAudio("positive", "Correct.wav").play()   // Positive feedback if the test succeeds
                .wait()
        )
        .failure(
            newAudio("negative", "Incorrect.wav").play()   // Negative feedback if the test fails
                .wait()
        )
	,
    clear()
	,
    newCanvas(1250,500)
        .settings.add(   0 , 100 , getImage("ImageVisPracticeB") )
		.settings.add( 650 , 100 , getImage("hiddenPracticeB"))
        .print()
	,
	newTimer(250)
        .start()
        .wait()
    ,
    newAudio("correctLeft", "CorrectLeft.wav")
        .play()
    ,
	getAudio("correctLeft")
		.wait("first")
	,
	newAudio("repeatB", "B_02.wav")
        .play()
    ,
	getAudio("repeatB")
		.wait("first")
	,
	newTimer(500)
        .start()
        .wait()
  )
  .log( "age" , getVar("age") )
  .log( "gender" , getVar("gender") )


PennController( "practiceC" ,
    newTimer(500)
        .start()
        .wait()
    ,
    newAudio("audPracticeC1", "C_01.wav")
        .play()
    ,
    newImage("ImageVisPracticeC1", "C_1.jpg")
         .settings.size(900,600)
    ,
    newCanvas(1250,500)
        .settings.add(   "center at 50%" , "middle at 50%" , getImage("ImageVisPracticeC1") )
        .print()
    ,
    getAudio("audPracticeC1")
       .wait("first")
    ,
	clear()
	,
	newTimer(500)
        .start()
        .wait()
    ,
    newAudio("audPracticeC", "C_02.wav")
        .play()
    ,
    newImage("ImageVisPracticeC", "C_2.jpg")
        .settings.size(600,400)
    ,
    newImage("Pcov", "Covered_Box.jpg")
        .settings.size(600,400)
    ,
	newImage("hiddenPracticeC", "C_3.jpg")
        .settings.size(600,400)
    ,
    newImage("larrow", "Left_Arrow.jpg")
        .settings.size(100,100)
    ,
    newImage("rarrow", "Right_Arrow.jpg")
        .settings.size(100,100)
    ,
    newCanvas(1250,500)
        .settings.add( 550 , 0 , getImage("larrow").settings.hidden() )
        .settings.add( 650 , 0 , getImage("rarrow").settings.hidden() )
        .settings.add(   0 , 100 , getImage("ImageVisPracticeC") )
        .settings.add( 650 , 100 , getImage("Pcov") )
        .print()
    ,
    getAudio("audPracticeC")
       .wait("first")
    ,
	newTimer(500)
        .start()
        .wait()
    ,
    getImage("larrow").settings.visible()
	,
    newAudio("left", "Left.wav")
        .play()
    ,
	getAudio("left")
		.wait("first")
	,
    getImage("larrow").settings.hidden()
	,
	newTimer(1000)
        .start()
        .wait()
    ,
    getImage("rarrow").settings.visible()
	,
    newAudio("orright", "orRight.wav")
        .play()
    ,
	getAudio("orright")
		.wait("first")
	,
    getImage("rarrow").settings.hidden()
	,
    newSelector("selectC")
		.settings.once()
        .settings.add( getImage("ImageVisPracticeC") , getImage("Pcov") )
        .settings.keys(          "F"    ,          "J"   )
        .settings.log()
        .wait()
    ,
	newTimer(250)
        .start()
        .wait()
    ,
    getSelector("selectC")           // Test whether the target image was selected
        .test.selected( getImage("Pcov") )
        .success(
            newAudio("positive", "Correct.wav").play()   // Positive feedback if the test succeeds
                .wait()
        )
        .failure(
            newAudio("negative", "Incorrect.wav").play()   // Negative feedback if the test fails
                .wait()
        )
	,
    clear()
	,
    newCanvas(1250,500)
        .settings.add(   0 , 100 , getImage("ImageVisPracticeC") )
		.settings.add( 650 , 100 , getImage("hiddenPracticeC"))
        .print()
	,
	newTimer(250)
        .start()
        .wait()
    ,
    newAudio("correctRight", "CorrectRight.wav")
        .play()
    ,
	getAudio("correctRight")
		.wait("first")
	,
	newAudio("repeatC", "C_02.wav")
        .play()
    ,
	getAudio("repeatC")
		.wait("first")
	,
	newTimer(500)
        .start()
        .wait()
  )
  .log( "age" , getVar("age") )
  .log( "gender" , getVar("gender") )
  

PennController( "practiceD" ,
    newTimer(500)
        .start()
        .wait()
    ,
    newAudio("audPracticeD1", "D_01.wav")
        .play()
    ,
    newImage("ImageVisPracticeD1", "D_1.jpg")
         .settings.size(900,600)
    ,
    newCanvas(1250,500)
        .settings.add(   "center at 50%" , "middle at 50%" , getImage("ImageVisPracticeD1") )
        .print()
    ,
    getAudio("audPracticeD1")
       .wait("first")
    ,	
	clear()
	,
	newTimer(500)
        .start()
        .wait()
    ,
    newAudio("audPracticeD", "D_02.wav")
        .play()
    ,
    newImage("ImageVisPracticeD", "D_2.jpg")
        .settings.size(600,400)
    ,
    newImage("Pcov", "Covered_Box.jpg")
        .settings.size(600,400)
    ,
	newImage("hiddenPracticeD", "D_3.jpg")
        .settings.size(600,400)
    ,
    newImage("larrow", "Left_Arrow.jpg")
        .settings.size(100,100)
    ,
    newImage("rarrow", "Right_Arrow.jpg")
        .settings.size(100,100)
    ,
    newCanvas(1250,500)
        .settings.add( 550 , 0 , getImage("larrow").settings.hidden() )
        .settings.add( 650 , 0 , getImage("rarrow").settings.hidden() )
        .settings.add(   0 , 100 , getImage("ImageVisPracticeD") )
        .settings.add( 650 , 100 , getImage("Pcov") )
        .print()
    ,
    getAudio("audPracticeD")
       .wait("first")
    ,
	newTimer(500)
        .start()
        .wait()
    ,
    getImage("larrow").settings.visible()
	,
    newAudio("left", "Left.wav")
        .play()
    ,
	getAudio("left")
		.wait("first")
	,
    getImage("larrow").settings.hidden()
	,
	newTimer(1000)
        .start()
        .wait()
    ,
    getImage("rarrow").settings.visible()
	,
    newAudio("orright", "orRight.wav")
        .play()
    ,
	getAudio("orright")
		.wait("first")
	,
    getImage("rarrow").settings.hidden()
	,
    newSelector("selectD")
		.settings.once()
        .settings.add( getImage("ImageVisPracticeD") , getImage("Pcov") )
        .settings.keys(          "F"    ,          "J"   )
        .settings.log()
        .wait()
    ,
	newTimer(250)
        .start()
        .wait()
    ,
    getSelector("selectD")           // Test whether the target image was selected
        .test.selected( getImage("ImageVisPracticeD") )
        .success(
            newAudio("positive", "Correct.wav").play()   // Positive feedback if the test succeeds
                .wait()
        )
        .failure(
            newAudio("negative", "Incorrect.wav").play()   // Negative feedback if the test fails
                .wait()
        )
	,
    clear()
	,
    newCanvas(1250,500)
        .settings.add(   0 , 100 , getImage("ImageVisPracticeD") )
		.settings.add( 650 , 100 , getImage("hiddenPracticeD"))
        .print()
	,
	newTimer(250)
        .start()
        .wait()
    ,
    newAudio("correctLeft", "CorrectLeft.wav")
        .play()
    ,
	getAudio("correctLeft")
		.wait("first")
	,
	newAudio("repeatD", "D_02.wav")
        .play()
    ,
	getAudio("repeatD")
		.wait("first")
	,
	newTimer(500)
        .start()
        .wait()
    ,
	newAudio("critical", "CriticalTrialsAfter.wav")
        .play()
    ,
    getAudio("critical")
       .wait("first")
	,
	clear()
	,
    newText("<p> </p>")
		.settings.center()
		.print()
    ,
    newText("<p> <b>เตรียมพร้อมนะคะ</b> </p>")
		.settings.center()
		.print()
    ,
    newText("<p> หลังจากภาพใหญ่ภาพแรก จะมีภาพที่สองขึ้นมา <b>ให้เลือกภาพที่ตรงกับเสียงบรรยายครั้งที่สองนะคะ</b> </p>")
		.settings.center()
		.print()
    ,
	newTimer(3000)
        .start()
        .wait()
	,
	newButton("continue", "ไปยังหน้าถัดไป")
	.settings.right()
    .print()
    .wait()
  )
  .log( "age" , getVar("age") )
  .log( "gender" , getVar("gender") )


PennController.Template( 
  variable => PennController( "experiment" ,
    newTimer(500)
        .start()
        .wait()
    ,
	newAudio("context", variable.ContextAudioFile)
        .play()
    ,
    newImage("ImageContext", variable.ContextImageFile)
        .settings.size(900, Math.round(variable.ContextImageFile.height*(900/variable.ContextImageFile.width)))
	,
    newCanvas(1250,500)
        .settings.add(   "center at 50%" , "middle at 50%" , getImage("ImageContext") )
        .print()
    ,
    getAudio("context")
       .wait("first")
    ,
	clear()
	,
	newTimer(500)
        .start()
        .wait()
    ,
    newAudio("description", variable.AudioFile)
        .play()
    ,
    newImage("visible", variable.ImageFile)
        .settings.size(600, Math.round(variable.ImageFile.height*(600/variable.ImageFile.width)))
    ,
    newImage("cov", "Covered_Box.jpg")
        .settings.size(600,500)
    ,
    newCanvas(1250,500)
        .settings.add( 0 , "middle at 50%" , getImage("visible") )
        .settings.add( 650 , 0 , getImage("cov") )
        .print()
    ,
    newSelector()
        .settings.add( getImage("visible") , getImage("cov") )
        .settings.keys(          "F"    ,          "J"   )
        .settings.log()
        .wait()
    ,
    getAudio("description")
       .wait("first")
    ,
    newTimer(500)
        .start()
        .wait()
  )
  .log( "age" , getVar("age") )
  .log( "gender" , getVar("gender") )
  .log( "Item"   , variable.Item   )
  .log( "Group"  , variable.Group  )
  .log( "MainCond" , variable.MainCond )
  .log( "Condition" , variable.Condition )
)


// Completion screen
PennController.SendResults( "send" )

PennController( "final" ,
    newText("<p>การทดลองสิ้นสุดลงแล้วค่ะ</p>")
		.settings.center()
        .print()
	,
    newText("<p><b>กราบขอบพระคุณท่านเป็นอย่างสูงที่ให้ความร่วมมือในการทดลองนะคะ</b></p>")
		.settings.center()
        .print()
	,
    newButton("void")
        .wait()
)