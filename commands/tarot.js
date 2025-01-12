const { MessageEmbed } = require('discord.js');
const User = require('./models/User'); // Đảm bảo rằng bạn đã kết nối với MongoDB

const tarotDeck = [
  // Major Arcana
  { name: "The Fool", meaning: "Khởi đầu mới, sự ngây thơ, sự tự do.", love: "Khởi đầu mới trong tình yêu, nhưng cần cẩn thận.", work: "Khởi đầu sự nghiệp đầy hứa hẹn.", finance: "Tài chính không ổn định, cần thận trọng.", health: "Sức khỏe tốt, nhưng cần chú ý đến các yếu tố ngoại cảnh." },
  { name: "The Magician", meaning: "Sức mạnh, tài năng, khả năng điều khiển.", love: "Khả năng thu hút, lôi cuốn người khác.", work: "Có khả năng đạt được thành công trong công việc.", finance: "Tài chính có thể phát triển mạnh mẽ nếu bạn tận dụng cơ hội.", health: "Tinh thần và sức khỏe ổn định, khả năng phục hồi nhanh chóng." },
  { name: "The High Priestess", meaning: "Trực giác, sự bí ẩn.", love: "Lắng nghe trực giác trong mối quan hệ, bạn sẽ có câu trả lời.", work: "Công việc đòi hỏi sự tinh tế và khả năng phán đoán.", finance: "Cẩn thận với các quyết định tài chính, hãy tin vào trực giác.", health: "Cảm giác mơ hồ, cần lắng nghe cơ thể mình hơn." },
  { name: "The Empress", meaning: "Sự sinh sản, sự nuôi dưỡng, sự sáng tạo.", love: "Tình yêu nở rộ, mối quan hệ tràn đầy sự chăm sóc và quan tâm.", work: "Khả năng sáng tạo cao, có thể tạo ra sự nghiệp vững chắc.", finance: "Tài chính dồi dào, sự ổn định trong kinh tế.", health: "Sức khỏe tốt, cơ thể tràn đầy năng lượng." },
  { name: "The Emperor", meaning: "Quyền lực, sự kiểm soát, kỷ luật.", love: "Có thể mang lại sự ổn định và kỷ luật trong mối quan hệ.", work: "Thành công trong công việc nhờ sự lãnh đạo và khả năng kiểm soát.", finance: "Tài chính ổn định, bạn có thể đầu tư an toàn.", health: "Sức khỏe mạnh mẽ, nhưng cần chú ý đến vấn đề căng thẳng." },
  { name: "The Hierophant", meaning: "Truyền thống, sự giảng dạy, sự thông thái.", love: "Một mối quan hệ truyền thống, cần tuân theo các giá trị cơ bản.", work: "Học hỏi từ các chuyên gia, sự thịnh vượng đến từ kiến thức và kỷ luật.", finance: "Cẩn thận với các quyết định tài chính, tìm kiếm lời khuyên từ người có kinh nghiệm.", health: "Sức khỏe ổn định, nhưng cần duy trì thói quen lành mạnh." },
  { name: "The Lovers", meaning: "Tình yêu, sự lựa chọn, mối quan hệ.", love: "Tình yêu đích thực, sự lựa chọn quan trọng trong mối quan hệ.", work: "Công việc yêu thích, bạn đang ở đúng con đường.", finance: "Cẩn thận với các quyết định tài chính lớn trong lúc này.", health: "Tình trạng sức khỏe tốt, nhưng cần chú ý đến cảm xúc." },
  { name: "The Chariot", meaning: "Sự chiến thắng, sự kiểm soát, sức mạnh ý chí.", love: "Công nhận sự nỗ lực trong mối quan hệ, vượt qua thử thách.", work: "Thành công nhờ sự quyết đoán và khả năng kiểm soát.", finance: "Có thể thu được lợi nhuận nhờ sự kiên trì và quyết tâm.", health: "Cơ thể và tinh thần mạnh mẽ, có thể vượt qua mọi thử thách." },
  { name: "Strength", meaning: "Sức mạnh nội tâm, sự can đảm, sự kiên nhẫn.", love: "Một mối quan hệ ổn định và mạnh mẽ, cần kiên nhẫn.", work: "Thành công đến nhờ sức mạnh tinh thần và sự kiên trì.", finance: "Tài chính có thể ổn định hơn khi bạn kiên nhẫn và khéo léo.", health: "Sức khỏe mạnh mẽ, sự kiên nhẫn sẽ giúp bạn hồi phục nhanh." },
  { name: "The Hermit", meaning: "Sự cô độc, tìm kiếm sự thật, sự chiêm nghiệm.", love: "Mối quan hệ có thể cần thời gian riêng tư để phát triển.", work: "Cần thời gian để suy nghĩ và tìm ra hướng đi đúng đắn trong công việc.", finance: "Hãy dành thời gian để đánh giá lại các khoản đầu tư và tài chính.", health: "Cảm giác cô đơn, cần chăm sóc sức khỏe tinh thần." },
  { name: "Wheel of Fortune", meaning: "Vận mệnh, thay đổi, sự thay đổi lớn.", love: "Một bước ngoặt lớn trong tình yêu, có thể là sự thay đổi bất ngờ.", work: "Cơ hội mới xuất hiện, nhưng có thể là một sự thay đổi bất ngờ.", finance: "Cần chuẩn bị cho các biến động tài chính, vận may có thể thay đổi.", health: "Sức khỏe có thể thay đổi, chú ý đến sự thay đổi của cơ thể." },
  { name: "Justice", meaning: "Công lý, sự công bằng, sự cân bằng.", love: "Mối quan hệ cần được duy trì dựa trên sự công bằng và cân bằng.", work: "Công lý sẽ được thực thi trong công việc, bạn sẽ nhận được những gì bạn xứng đáng.", finance: "Tài chính sẽ có sự công bằng, nếu bạn đã làm việc chăm chỉ.", health: "Sức khỏe sẽ trở lại cân bằng nếu bạn chăm sóc bản thân tốt hơn." },
  { name: "The Hanged Man", meaning: "Sự hy sinh, thay đổi góc nhìn, sự chờ đợi.", love: "Mối quan hệ có thể cần một thay đổi hoặc sự hy sinh để tiến tới.", work: "Công việc có thể tạm dừng, cần chờ đợi sự thay đổi từ bên ngoài.", finance: "Đừng vội vàng đầu tư, cần chờ đợi cơ hội tốt hơn.", health: "Sức khỏe có thể tạm thời không ổn định, cần thay đổi thói quen." },
  { name: "Death", meaning: "Kết thúc, sự chuyển mình, sự tái sinh.", love: "Mối quan hệ có thể kết thúc, nhưng sẽ dẫn đến sự tái sinh mới.", work: "Công việc cũ có thể kết thúc, nhưng một cơ hội mới sẽ xuất hiện.", finance: "Một thời kỳ kết thúc trong tài chính, nhưng cơ hội mới sẽ đến.", health: "Sức khỏe có thể thay đổi, có thể là một quá trình phục hồi." },
  { name: "Temperance", meaning: "Sự điều hòa, sự kiên nhẫn, sự hòa hợp.", love: "Mối quan hệ cần sự kiên nhẫn và điều hòa để phát triển.", work: "Cần giữ sự bình tĩnh và kiên nhẫn trong công việc.", finance: "Đừng vội vàng trong các quyết định tài chính, hãy chờ đợi thời điểm thích hợp.", health: "Sức khỏe sẽ tốt lên nếu bạn duy trì sự cân bằng và điều độ." },
  { name: "The Devil", meaning: "Cám dỗ, sự lệ thuộc, sự kiểm soát.", love: "Mối quan hệ có thể bị cám dỗ hoặc lệ thuộc vào những yếu tố tiêu cực.", work: "Công việc có thể cảm thấy như bị kiểm soát, cần tìm cách thoát ra.", finance: "Có thể đối mặt với cám dỗ tài chính, cần cẩn thận với các quyết định.", health: "Cảm giác căng thẳng, cần thoát ra khỏi những thói quen không tốt." },
  { name: "The Tower", meaning: "Sự sụp đổ, sự thay đổi bất ngờ, sự thức tỉnh.", love: "Mối quan hệ có thể trải qua một sự sụp đổ hoặc thay đổi bất ngờ.", work: "Công việc có thể thay đổi đột ngột, nhưng đó là cơ hội để tái sinh.", finance: "Một cú sốc tài chính lớn có thể xảy ra, nhưng sẽ giúp bạn nhận ra điều quan trọng.", health: "Sức khỏe có thể bị ảnh hưởng bởi sự thay đổi bất ngờ, cần chú ý." },
  { name: "The Star", meaning: "Hy vọng, sự đổi mới, sự lạc quan.", love: "Mối quan hệ sẽ mang lại hy vọng và sự sáng tạo.", work: "Công việc có thể gặp khó khăn nhưng bạn sẽ tìm thấy ánh sáng cuối con đường.", finance: "Tài chính sẽ ổn định và phát triển nếu bạn giữ niềm tin vào tương lai.", health: "Sức khỏe tốt, sự phục hồi và tái sinh đang đến gần." },
  { name: "The Moon", meaning: "Sự ẩn giấu, sự mơ hồ, trực giác.", love: "Mối quan hệ có thể có sự mơ hồ, cần lắng nghe trực giác.", work: "Công việc có thể gặp khó khăn do sự không rõ ràng.", finance: "Cẩn thận với các quyết định tài chính, có thể có sự lừa dối.", health: "Sức khỏe có thể bị ảnh hưởng bởi sự mệt mỏi hoặc căng thẳng." },
  { name: "The Sun", meaning: "Niềm vui, sự thành công, sự rõ ràng.", love: "Mối quan hệ mang lại niềm vui và hạnh phúc.", work: "Thành công trong công việc, mọi khó khăn sẽ được giải quyết.", finance: "Tài chính phát triển mạnh mẽ, bạn sẽ nhận được phần thưởng xứng đáng.", health: "Sức khỏe tốt, năng lượng dồi dào, cảm giác vui vẻ." },
  { name: "Judgement", meaning: "Phán xét, sự thức tỉnh, sự tái sinh.", love: "Một sự thức tỉnh trong mối quan hệ, có thể là sự tha thứ.", work: "Công việc có thể bước sang một chương mới, bạn sẽ được công nhận.", finance: "Sự tái sinh trong tài chính, cơ hội mới sẽ xuất hiện.", health: "Sức khỏe được phục hồi, bạn sẽ cảm thấy khỏe mạnh hơn." },
  { name: "The World", meaning: "Hoàn thành, sự hoàn thiện, sự toàn vẹn.", love: "Một mối quan hệ viên mãn, hoàn chỉnh.", work: "Công việc thành công, bạn đã hoàn thành mục tiêu của mình.", finance: "Tài chính ổn định và thịnh vượng, mọi thứ đã được hoàn thành.", health: "Sức khỏe tốt, bạn cảm thấy hoàn thiện và viên mãn." },

  // Minor Arcana - Cups
  { name: "7 of Cups", meaning: "Sự lựa chọn, ảo tưởng, mơ mộng.", love: "Có nhiều lựa chọn trong tình yêu, cần cẩn thận với các ảo tưởng.", work: "Đang có nhiều cơ hội, nhưng cần phải quyết định một cách rõ ràng.", finance: "Cẩn thận với các khoản đầu tư không rõ ràng.", health: "Cần giữ sự rõ ràng về tình trạng sức khỏe, tránh mơ mộng quá nhiều." },
  { name: "8 of Cups", meaning: "Sự từ bỏ, sự tìm kiếm điều tốt đẹp hơn.", love: "Từ bỏ mối quan hệ cũ để tìm kiếm một tình yêu tốt hơn.", work: "Rời bỏ một công việc không mang lại sự thỏa mãn.", finance: "Từ bỏ các khoản đầu tư không hiệu quả để tìm kiếm cơ hội tốt hơn.", health: "Cần sự thay đổi trong lối sống để cải thiện sức khỏe." },
  { name: "9 of Cups", meaning: "Hoàn thành, sự hài lòng.", love: "Một mối quan hệ viên mãn, hạnh phúc.", work: "Thành công trong công việc, sự hài lòng với những gì đã đạt được.", finance: "Tài chính ổn định, bạn đã đạt được mục tiêu tài chính của mình.", health: "Cảm thấy khỏe mạnh và hạnh phúc." },
  { name: "10 of Cups", meaning: "Hạnh phúc gia đình, sự viên mãn.", love: "Một mối quan hệ đầy tình yêu thương và sự hiểu biết.", work: "Sự thành công trong sự nghiệp mang lại sự ổn định cho gia đình.", finance: "Tài chính ổn định, mang lại hạnh phúc cho gia đình.", health: "Sức khỏe tốt, hạnh phúc và hòa hợp trong cuộc sống." },

  // Minor Arcana - Wands
  { name: "7 of Wands", meaning: "Đối mặt với thử thách, bảo vệ bản thân.", love: "Cần bảo vệ mối quan hệ của bạn trước những thử thách.", work: "Đang phải đối mặt với sự cạnh tranh, nhưng bạn có thể vượt qua.", finance: "Cần bảo vệ các khoản đầu tư của mình.", health: "Đừng để căng thẳng làm ảnh hưởng đến sức khỏe của bạn." },
  { name: "8 of Wands", meaning: "Sự nhanh chóng, hành động.", love: "Mối quan hệ tiến triển nhanh chóng.", work: "Cơ hội công việc đến nhanh chóng, cần hành động ngay lập tức.", finance: "Một cơ hội đầu tư hoặc tài chính đến một cách nhanh chóng.", health: "Cảm giác năng động, sức khỏe tốt." },
  { name: "9 of Wands", meaning: "Kiên trì, phòng thủ.", love: "Cảm giác mệt mỏi trong mối quan hệ, nhưng bạn vẫn kiên trì.", work: "Đã vượt qua nhiều thử thách trong công việc, cần kiên trì thêm một chút.", finance: "Cẩn thận với những quyết định tài chính trong thời gian tới.", health: "Cần nghỉ ngơi và chăm sóc sức khỏe để không kiệt sức." },
  { name: "10 of Wands", meaning: "Gánh nặng, trách nhiệm.", love: "Mối quan hệ có thể cảm thấy nặng nề và gánh vác trách nhiệm.", work: "Cảm thấy gánh nặng trong công việc, cần chia sẻ công việc.", finance: "Gánh nặng tài chính, cần sự thay đổi hoặc giảm bớt chi tiêu.", health: "Cần giảm bớt căng thẳng và gánh nặng trong cuộc sống." },

  // Minor Arcana - Swords
  { name: "7 of Swords", meaning: "Lừa dối, sự thật bị che giấu.", love: "Cẩn thận với sự lừa dối trong mối quan hệ.", work: "Đôi khi phải làm việc mờ ám để đạt được mục tiêu.", finance: "Cẩn thận với những khoản đầu tư không minh bạch.", health: "Cẩn thận với stress và sự mệt mỏi tâm lý." },
  { name: "8 of Swords", meaning: "Sự ràng buộc, cảm giác bế tắc.", love: "Mối quan hệ có thể khiến bạn cảm thấy bị ràng buộc.", work: "Cảm giác bị mắc kẹt trong công việc, nhưng có thể tìm ra giải pháp.", finance: "Cảm thấy bế tắc về tài chính, nhưng sẽ có cách thoát ra.", health: "Cảm giác bế tắc trong tình trạng sức khỏe, cần tìm hướng giải quyết." },
  { name: "9 of Swords", meaning: "Lo âu, căng thẳng.", love: "Cảm giác lo lắng trong mối quan hệ, sợ hãi về điều gì đó.", work: "Lo âu về sự nghiệp, căng thẳng vì công việc.", finance: "Lo lắng về tình hình tài chính, có thể là do căng thẳng.", health: "Stress và lo âu ảnh hưởng đến sức khỏe." },
  { name: "10 of Swords", meaning: "Kết thúc, sự phản bội.", love: "Một mối quan hệ có thể kết thúc vì sự phản bội hoặc khổ đau.", work: "Một công việc kết thúc, có thể bị sa thải hoặc gặp thất bại.", finance: "Mất mát tài chính lớn, nhưng cũng có thể là cơ hội tái sinh.", health: "Cảm giác kiệt quệ, cần hồi phục sau khó khăn." },

  // Minor Arcana - Pentacles
  { name: "7 of Pentacles", meaning: "Đầu tư, sự kiên nhẫn.", love: "Cần kiên nhẫn trong mối quan hệ để thấy kết quả.", work: "Đầu tư vào công việc sẽ cần thời gian để đón nhận kết quả.", finance: "Cần đầu tư dài hạn để đạt được kết quả tài chính mong muốn.", health: "Đầu tư vào sức khỏe là một chiến lược dài hạn." },
  { name: "8 of Pentacles", meaning: "Sự chăm chỉ, công việc chi tiết.", love: "Mối quan hệ đòi hỏi sự cố gắng và chăm sóc chi tiết.", work: "Cần tập trung vào công việc, chăm chỉ học hỏi và phát triển kỹ năng.", finance: "Cần làm việc chăm chỉ để đạt được mục tiêu tài chính.", health: "Cần duy trì thói quen chăm sóc sức khỏe hàng ngày." },
  { name: "9 of Pentacles", meaning: "Tự lập, thành quả đạt được.", love: "Một mối quan hệ ổn định và tự do.", work: "Thành công trong công việc, có thể tự do tài chính.", finance: "Đạt được sự ổn định tài chính.", health: "Sức khỏe mạnh mẽ, đạt được kết quả tốt nhờ chăm sóc bản thân." },
  { name: "10 of Pentacles", meaning: "Thành công lâu dài, gia đình, sự thịnh vượng.", love: "Mối quan hệ gắn kết, đầy thịnh vượng.", work: "Công việc thành công, mang lại sự ổn định lâu dài.", finance: "Tài chính ổn định và phát triển, sự thịnh vượng.", health: "Sức khỏe mạnh mẽ, hưởng thụ sự ổn định trong cuộc sống." },
];

module.exports = {
  name: 'tarot',
  description: 'Tarot',
  async execute(message) {
    // Kiểm tra xem người dùng đã sử dụng lệnh trong 24 giờ chưa
    const tarotData = await User.findOne({ userId: message.author.id });

    if (tarotData && tarotData.lastUsed > Date.now() - 86400000) {
      return message.reply('Bạn chỉ có thể sử dụng lệnh Tarot một lần trong 24 giờ!');
    }

    // Chọn ngẫu nhiên một lá bài Tarot
    const randomCard = tarotDeck[Math.floor(Math.random() * tarotDeck.length)];

    // Tạo Embed chứa thông tin về lá bài Tarot
    const embed = new MessageEmbed()
      .setColor('#FF0000')
      .setTitle(`Lá Tarot: ${randomCard.name}`)
      .setDescription(randomCard.meaning) // Ý nghĩa của lá bài
      .addField('Tình yêu', randomCard.love) // Thông tin về tình yêu
      .addField('Công việc', randomCard.work) // Thông tin về công việc
      .addField('Tài chính', randomCard.finance) // Thông tin về tài chính
      .addField('Sức khỏe', randomCard.health); // Thông tin về sức khỏe

    // Lưu lại thời gian sử dụng
    await User.updateOne(
      { userId: message.author.id },
      { lastUsed: Date.now() },
      { upsert: true }
    );

    // Gửi Embed tới người dùng
    message.channel.send({ embeds: [embed] });
  }
};
