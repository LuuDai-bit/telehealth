desc "This is for making subcribtion for imported data"
task :make_vtt => :environment do 
  Video.find_each do |video| 
    File.open("telehealth-fe/public/subcription/#{video.code}.vtt", "w") do |f|
      f.write "WEBVTT\n\n"
      video.sequences.find_each do |sequence|
        f.write "#{hms(sequence.start_at)} --> #{hms(sequence.end_at)}\n#{sequence.result}\n"
      end
    end
  end
end

def hms(seconds, decimals = 3)
  seconds = seconds.to_f
  int = seconds.floor
  decs = [decimals, 8].min
  frac = seconds - int
  hms = [int / 3600, (int / 60) % 60, int % 60].map { |t| t.to_s.rjust(2,'0') }.join(':')
  if decs > 0
    fp = (frac == 0) ? '.000' : "#{'%.3f' % (frac).round(decs)}"[1..-1]
    hms  << fp
  end
  hms
end
