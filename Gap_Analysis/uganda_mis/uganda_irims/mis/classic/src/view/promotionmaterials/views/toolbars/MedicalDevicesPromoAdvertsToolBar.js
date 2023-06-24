Ext.define('Admin.view.view.promotionmaterials.views.toolbars.MedicalDevicesPromoAdvertsToolBar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'medicaldevicespromoadvertstoolbar',
	//controller: 'promotionmaterialviewcontroller',
      ui: 'footer',
    defaults: {
        ui: 'soft-green',
        iconAlign: 'top'
    },
    requires: [
        'Ext.ux.BoxReorderer'
    ],
    plugins: 'boxreorderer',
    overflowHandler: 'scroller',
    items: [
        {
            text: 'Home',
            iconCls: 'x-fa fa-home',
            name: 'promotionAndAdvert'
        },
        {
            text: 'Initialise Promotional & Advertisements Application',
          
            iconCls: 'x-fa fa-sitemap',
            menu:{
                xtype: 'menu',
                items:[
                    {
                        text: 'New Application for Approval of Promotion Material',
                        iconCls: 'x-fa fa-check',
                        handler:'onNewPromotionMaterials',
                        section_id:4,
                        xtypeWrapper:'#promotionadvertmedicaldeviceswrapper',
                        app_type: 33
                    },
                    {
                        text: 'Renewal Application for Promotion & Advertisements Permits',
                        iconCls: 'x-fa fa-check',
                        handler:'onNewPromotionMaterials',
                        section_id:4,
                        xtypeWrapper:'#promotionadvertmedicaldeviceswrapper',
                        app_type: 34
                    },
                    {
                        text: 'Variation Promotion & Advertisements Permits',
                        iconCls: 'x-fa fa-check',
                        handler:'onNewPromotionMaterials',
                        section_id:4,
                        xtypeWrapper:'#promotionadvertmedicaldeviceswrapper',
                        app_type: 35
                    },
					{
                        text: 'Withdrawal Promotion & Advertisements Permits',
                        iconCls: 'x-fa fa-check',
                        handler:'onNewPromotionMaterials',
                        section_id:4,
                        xtypeWrapper:'#promotionadvertmedicaldeviceswrapper',
                        app_type: 36
                    }
                ]
            }
        },
        '->',
        {
            text: 'Documents',
            iconCls: 'x-fa fa-folder'
        },
        {
            text: 'Workflow',
            iconCls: 'x-fa fa-sitemap',
            hidden: true,
            menu:{
                xtype: 'menu',
                items:[
                    {
                        text: 'Promotion Material',
                        iconCls: 'x-fa fa-check',
                        handler:'showPromotionAndAdvertMaterialWorkflow',
                        app_type: 33
                    },
                    {
                        text: 'Permit to Conduct promotion Meeting',
                        iconCls: 'x-fa fa-check',
                        handler:'showPromotionAndAdvertMaterialWorkflow',
                        app_type:33
                    },
                    {
                        text: 'Complanits on Promotion Materials',
                        iconCls: 'x-fa fa-check',
                        handler:'showPromotionAndAdvertMaterialWorkflow',
                        app_type: 33
                    },
					{
                        text: 'Trade Fair Permits',
                        iconCls: 'x-fa fa-check',
                        handler:'showPromotionAndAdvertMaterialWorkflow',
                        app_type: 33
                    }
                ]
            }
        }
    ]
});