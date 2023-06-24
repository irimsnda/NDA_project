/**
 * Created by Kip on 10/16/2018. ManagementProcessDetailsStr
 */
(function () {
    var seed = 1.3;

    // Controllable random.
    function random() {
        seed *= 7.3;
        seed -= Math.floor(seed);
        return seed;
    }
    
    Ext.define('Admin.store.dashboard.ManagementProcessDetailsStr', {
        alias: 'store.managementprocessdetailsstr',
        extend: 'Ext.data.Store',

        config: {
            numRecords: 50
        },

        fields: ['id', 'g0', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'name'],
        generateData: function (count) {
            var data = [],
                record = {
                    id: 0,
                    g0: 300,
                    g1: 700 * random() + 100,
                    g2: 700 * random() + 100,
                    g3: 700 * random() + 100
                }, i;

            data.push(record);
            for (i = 1; i < count; i++) {
                record = {
                    id: i,
                    g0: record.g0 + 30 * random(),
                    g1: Math.abs(record.g1 + 300 * random() - 140),
                    g2: Math.abs(record.g2 + 300 * random() - 140),
                    g3: Math.abs(record.g3 + 300 * random() - 140),
                    name: 'Process-' + i
                };
                data.push(record);
            }
            this.loadData(data);
        },
        constructor: function(config) {
            var me = this;

            me.callParent([config]);
            me.generateData(me.getNumRecords());
        }
    });
})();