desc "This is for making subcribtion for imported data"
task :make_vtt => :environment do 
  Video.find_each do |video| 
    File.open("public/subcription/#{video.code}.vtt", "w") do |f|
      video.sequences.find_each do |sequence|
        f.write "#{hms(sequence.start_at)} --> #{hms(sequence.end_at)}\n#{sequence.result}\n"
      end
    end
  end
end

def hms(seconds, decimals = 2)
  seconds = seconds.to_f
  int = seconds.floor
  decs = [decimals, 8].min
  frac = seconds - int
  hms = [int / 3600, (int / 60) % 60, int % 60].map { |t| t.to_s.rjust(2,'0') }.join(':')
  if decs > 0
    fp = (frac == 0) ? '.00' : "#{(frac).round(decs)}"[1..-1]
    hms  << fp
  end
  hms
end
