Ext.define('Admin.view.managementdashboard.views.panels.ProductApplicationRepresentationPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'productApplicationRepresentationPnl',
    title: 'Product Report',
    userCls: 'big-100 small-100',
    padding: '5 5 5 5',
    controller: 'managementdashboardVctr',
    scrollable: true,
    layout:{
        type: 'form'
    },
    border: true,
    items: [{
            xtype: 'cartesian',
            height: 500,
            listeners: {
                beforerender: {
                    fn: 'func_setStore',
                    config: {
                        pageSize: 1000,
                        storeId: 'ProductAppDashReportStr',
                        proxy: {
                            url: 'managementdashboard/ProductgetApplicationsDasboardReport'
                        }
                    },
                    isLoad: true
                  }
           },
            reference: 'chart',
            requires: ['Ext.chart.theme.Muted'],

            legend: {
                type: 'sprite',
                docked: 'right'
            },
            insetPadding: {
                top: 40,
                left: 0,
                right: 10,
                bottom: 40
            },
            sprites: [{
                type: 'text',
                text: 'Applications Report Chart',
                fontSize: 24,
                width: 100,
                height: 30,
                x: 40, // the sprite x position
                y: 20  // the sprite y position
            }],
            axes: [{
                type: 'numeric',
                position: 'left',
                adjustByMajorUnit: true,
                grid: true,
                fields: ['total'],
                renderer: 'onAxisLabelRender',
                minimum: 0
            }, {
                type: 'category',
                position: 'bottom',
                grid: true,
                fields: ['module_name'],
                label: {
                    rotate: {
                        degrees: 20
                    }
                },
               style: {
                    estStepSize: 20  
                },

            }],
            series: [{
                type: 'bar',
                title: ['Total Registered', 'Medicines','Medical Devices', 'Clinical Trial'],
                xField: ['module_name'],
                yField: ['total', 'Medicines','Medical Devices','Clinical Trial'],
                stacked: false,
                style: {
                    opacity: 0.80,
                    minGapWidth: 20,
                    maxBarWidth: 300,
                },
                highlight: {
                    fillStyle: 'green',
                    opacity: 0.8
                },
                tooltip:{ 
                      trackMouse:true, 
                      scope: this, 
                      renderer:function(toolTip, storeItem, item){
                        toolTip.setHtml(storeItem.get(item.field).toFixed(1)+' '+item.field+ ' for '+storeItem.get('module_name') );
                      }
                 }
            }]
            
         }]
});
