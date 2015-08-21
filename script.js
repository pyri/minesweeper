$(document).ready(function () {
    var areaSize = 10,
        countBombs = 20,
        $sapperArea = $('.sapper-area'),
        isSetFirstClick = false,
        bombsSequence = [],
        $msg = $('.msg');


    for (var i = 0; i < areaSize; i++) {
        var $tds = '';
        $sapperArea.append('<tr class="sapper-str-' + i + '">');

        for (var j = 0; j < areaSize; j++) {
            $tds += '<td class="sapper-cell new" id="' + i + '' + j + '">';
        }

        $('.sapper-str-' + i).append($tds);
    }

    $('.sapper-cell').on('click', function () {
        var idsOfNewCleanCells = [];

        if (!$(this).hasClass('new')) {
           return false;
        }

        $(this).removeClass('new');

        if (!isSetFirstClick) {
            bombsSequence = getNumbersOfBombCell(countBombs, areaSize);
            console.log(bombsSequence);
        }

        var currentCell = +$(this).attr('id');

        if (bombsSequence.indexOf(currentCell) != -1 && isSetFirstClick) {
            $(this).addClass('bomb-cell');
            $msg.text('You lost!');
            $sapperArea.find('.sapper-cell').removeClass('new');

            return false;
        }

        var level = getDangerLevelForCell(currentCell, bombsSequence);

        $(this).text(level).addClass('open-cell');

        if (level == 0) {
            openCleanAreaRoundCurrent(currentCell, bombsSequence, areaSize);
        }

        var $newCells = $('.new');

        $.each($newCells, function (key, val) {
            var id = val.getAttribute('id');

            if (bombsSequence.indexOf(+id) == -1) {
                idsOfNewCleanCells.push(id);
            }
        });

        if (idsOfNewCleanCells.length == 0) {
            $msg.text('You win!');
            $sapperArea.find('.sapper-cell').removeClass('new');
        }

        if (!isSetFirstClick) {
            isSetFirstClick = true;
        }
    });

    function openCleanAreaRoundCurrent (id, bombsSequence, areaSize) {
        var ids = [id-1, id-9, id-10, id-11, id+1, id+9, id+10, id+11];
        console.log(ids);
        $.each(ids, function (key, val) {
            if (val <= areaSize*areaSize && val >= 0
                && ([id-11, id-1, id+9].indexOf(val) != -1 ? val%10 < id%10 : true)
                && ([id-9, id+1, id+11].indexOf(val) != -1 ? val%10 > id%10 : true)) {

                var level = getDangerLevelForCell(val, bombsSequence),
                    valTwoDigit = (val < 10) ? '0' + val : val,
                    curId =  $('#' + valTwoDigit);

                if (!curId.hasClass('open-cell')) {
                    curId.text(level).addClass('open-cell');
                    console.log('val:', val);
                    if (level == 0) {
                        openCleanAreaRoundCurrent(val, bombsSequence, areaSize);
                    }
                }
            }
        });
    }
    
    function getDangerLevelForCell (id, bombsSequence) {
        var level = 0,
            ids = [id-1, id-9, id-10, id-11, id+1, id+9, id+10, id+11];

        $.each (ids, function (key, id) {
            if (bombsSequence.indexOf(id) != -1) {
                level++;
            }
        });

        return level;
    }

    function getNumbersOfBombCell (countBombs, areaSize) {
        var bombsArr = [];

        while (bombsArr.length < countBombs) {
            var num = Math.floor((Math.random() * (areaSize * areaSize)));

            if (bombsArr.indexOf(num) == -1) {
                bombsArr.push(num);
            }
        }

        return bombsArr;
    }
});