import React from 'react';
import {Svg, Path, G, Mask, Polygon, Rect} from 'react-native-svg';
import {useTheme} from 'styled-components/native';
import {PaymentMethodKey} from '../../../navigation/services/buy-crypto/constants/BuyCryptoConstants';
import {WithdrawalMethodKey} from '../../../navigation/services/sell-crypto/constants/SellCryptoConstants';
import {White} from '../../../styles/colors';

const PaymentMethodIcon: React.FC<{
  paymentMethodId: PaymentMethodKey | WithdrawalMethodKey;
  width?: number;
  height?: number;
}> = ({paymentMethodId, width, height}) => {
  const renderSvg = (id: PaymentMethodKey | WithdrawalMethodKey) => {
    const theme = useTheme();
    switch (id) {
      case 'ach':
      case 'gbpBankTransfer':
      case 'sepaBankTransfer':
        return (
          <Svg width={width ?? 37} height={height ?? 37} viewBox="0 0 37 37">
            <G
              id="Page-1"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd">
              <G
                id="Choose-Payment-Method"
                transform="translate(-300.000000, -539.000000)"
                fill-rule="nonzero">
                <G id="Group-5" transform="translate(300.000000, 539.000000)">
                  <G id="Group-4">
                    <Rect
                      id="Rectangle"
                      fill="#9BA3AE"
                      x="3.46875"
                      y="18.5"
                      width="2.3125"
                      height="11.5625"
                    />
                    <Rect
                      id="Rectangle"
                      fill="#9BA3AE"
                      x="12.71875"
                      y="18.5"
                      width="2.3125"
                      height="11.5625"
                    />
                    <Rect
                      id="Rectangle"
                      fill="#9BA3AE"
                      x="21.96875"
                      y="18.5"
                      width="2.3125"
                      height="11.5625"
                    />
                    <Rect
                      id="Rectangle"
                      fill="#9BA3AE"
                      x="31.21875"
                      y="18.5"
                      width="2.3125"
                      height="11.5625"
                    />
                    <Path
                      d="M35.84375,32.375 L1.15625,32.375 C0.518,32.375 0,32.8918437 0,33.53125 L0,35.84375 C0,36.4831563 0.518,37 1.15625,37 L35.84375,37 C36.482,37 37,36.4831563 37,35.84375 L37,33.53125 C37,32.8918437 36.482,32.375 35.84375,32.375 Z"
                      id="Path"
                      fill="#E7E7E7"
                    />
                    <Path
                      d="M36.3883437,9.38528125 L19.0445938,0.13528125 C18.7046562,-0.04509375 18.2965,-0.04509375 17.9565625,0.13528125 L0.6128125,9.38528125 C0.235875,9.58646875 0,9.97959375 0,10.40625 L0,15.03125 C0,15.6706563 0.518,16.1875 1.15625,16.1875 L35.84375,16.1875 C36.482,16.1875 37,15.6706563 37,15.03125 L37,10.40625 C37,9.97959375 36.764125,9.58646875 36.3883437,9.38528125 Z M18.5,11.5625 C17.2223437,11.5625 16.1875,10.5276562 16.1875,9.25 C16.1875,7.97234375 17.2223437,6.9375 18.5,6.9375 C19.7776562,6.9375 20.8125,7.97234375 20.8125,9.25 C20.8125,10.5276562 19.7776562,11.5625 18.5,11.5625 Z"
                      id="Shape"
                      fill="#E7E7E7"
                    />
                  </G>
                </G>
              </G>
            </G>
          </Svg>
        );
      case 'applePay':
        return (
          <Svg width={width ?? 55} height={height ?? 37} viewBox="0 0 55 37">
            <G
              id="Darkmode"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd">
              <G id="Choose-Payment-Method" transform="translate(-291 -175)">
                <G
                  id="Apple_Pay_Mark_RGB_041619-2"
                  transform="translate(291 175)">
                  <G
                    id="Apple_Pay_Mark_RGB_041619"
                    transform="translate(0 0.817)">
                    <G id="Group-3">
                      <Mask id="mask-2" fill="white">
                        <Polygon points="0.02 0.013 54.841 0.013 54.841 35.664 0.02 35.664" />
                      </Mask>
                      <G id="Clip-2" />
                      <Path
                        d="M49.93 0.012L4.911 0.012C4.724 0.012 4.536 0.012 4.349 0.013C4.191 0.014 4.033 0.016 3.875 0.02C3.531 0.03 3.183 0.05 2.844 0.112C2.498 0.175 2.177 0.278 1.863 0.44C1.555 0.6 1.273 0.808 1.028 1.056C0.784 1.305 0.578 1.591 0.422 1.904C0.262 2.223 0.161 2.549 0.099 2.9C0.037 3.245 0.017 3.598 0.008 3.947C0.004 4.107 0.002 4.268 0.001 4.428C0 4.618 0 4.809 0 5V30.676C0 30.867 0 31.057 0.001 31.248C0.002 31.408 0.004 31.569 0.008 31.729C0.017 32.078 0.037 32.43 0.099 32.775C0.161 33.127 0.262 33.453 0.422 33.771C0.578 34.085 0.784 34.371 1.028 34.619C1.273 34.868 1.555 35.076 1.863 35.235C2.177 35.397 2.498 35.5 2.844 35.564C3.183 35.625 3.531 35.646 3.875 35.655C4.033 35.659 4.191 35.662 4.349 35.662C4.536 35.664 4.724 35.664 4.911 35.664H49.93C50.117 35.664 50.305 35.664 50.492 35.662C50.65 35.662 50.808 35.659 50.966 35.655C51.31 35.646 51.657 35.625 51.998 35.564C52.343 35.5 52.664 35.397 52.978 35.235C53.286 35.076 53.568 34.868 53.813 34.619C54.057 34.371 54.262 34.085 54.419 33.771C54.579 33.453 54.681 33.127 54.742 32.775C54.804 32.43 54.823 32.078 54.833 31.729C54.837 31.569 54.839 31.408 54.84 31.248C54.841 31.057 54.841 30.867 54.841 30.676V5C54.841 4.809 54.841 4.618 54.84 4.428C54.839 4.268 54.837 4.107 54.833 3.947C54.823 3.598 54.804 3.245 54.742 2.9C54.681 2.549 54.579 2.223 54.419 1.904C54.262 1.591 54.057 1.305 53.813 1.056C53.568 0.808 53.286 0.6 52.978 0.44C52.664 0.278 52.343 0.175 51.998 0.112C51.657 0.05 51.31 0.03 50.966 0.02C50.808 0.016 50.65 0.014 50.492 0.013C50.305 0.012 50.117 0.012 49.93 0.012"
                        id="Fill-1"
                        fill="#000"
                        mask="url(#mask-2)"
                      />
                    </G>
                    <Path
                      d="M49.9300602,1.20011215 L50.4837048,1.2011215 C50.6337952,1.20213084 50.7838855,1.20381308 50.9346386,1.20818692 C51.1970482,1.21525234 51.5041867,1.22971963 51.7904518,1.28186916 C52.0389458,1.32728972 52.2476807,1.39659813 52.4478012,1.49988785 C52.6456024,1.60183178 52.826506,1.73540187 52.9845482,1.89588785 C53.143253,2.05738318 53.2751205,2.24142056 53.3768373,2.44429907 C53.4782229,2.64616822 53.5458133,2.85678505 53.5905422,3.11114019 C53.6415663,3.39880374 53.6554819,3.71136449 53.6631024,3.97917757 C53.6670783,4.13091589 53.6687349,4.28198131 53.6697289,4.43708411 C53.6710542,4.62414953 53.6710542,4.8115514 53.6710542,4.99928972 L53.6710542,30.6763738 C53.6710542,30.8641121 53.6710542,31.0511776 53.6693976,31.2422804 C53.6687349,31.3936822 53.6670783,31.5450841 53.6631024,31.6968224 C53.6554819,31.9646355 53.6415663,32.2765234 53.5898795,32.5675514 C53.5458133,32.8185421 53.4782229,33.0294953 53.376506,33.2320374 C53.2747892,33.4345794 53.143253,33.6186168 52.9852108,33.7787664 C52.8261747,33.9402617 52.6459337,34.0734953 52.4458133,34.1764486 C52.2470181,34.2794019 52.0389458,34.3487103 51.7924398,34.3934579 C51.5005422,34.4466168 51.1811446,34.4610841 50.9399398,34.4674766 C50.7885241,34.4711776 50.6377711,34.4731963 50.4830422,34.4738692 C50.2991566,34.4755514 50.1142771,34.4755514 49.9300602,34.4755514 L4.91123494,34.4755514 C4.90891566,34.4755514 4.90659639,34.4755514 4.90394578,34.4755514 C4.72204819,34.4755514 4.53948795,34.4755514 4.35427711,34.4738692 C4.20319277,34.4731963 4.05210843,34.4711776 3.9063253,34.4678131 C3.6601506,34.4610841 3.34009036,34.4466168 3.05051205,34.3937944 C2.8023494,34.3487103 2.59394578,34.2794019 2.3925,34.1751028 C2.1946988,34.0731589 2.01412651,33.9402617 1.85509036,33.7780935 C1.69737952,33.6182804 1.5661747,33.4349159 1.46478916,33.2320374 C1.36307229,33.0298318 1.2951506,32.8182056 1.25042169,32.5641869 C1.19906627,32.2741682 1.18481928,31.9629533 1.17786145,31.6968224 C1.17355422,31.5447477 1.17189759,31.3923364 1.17090361,31.2409346 L1.17024096,30.7944673 L1.17024096,4.88119626 L1.17090361,4.43540187 C1.17189759,4.2833271 1.17355422,4.13125234 1.17786145,3.97884112 C1.18481928,3.71271028 1.19906627,3.40149533 1.25108434,3.10878505 C1.2951506,2.8571215 1.36307229,2.64583178 1.46512048,2.44228037 C1.56584337,2.24108411 1.69737952,2.05738318 1.85608434,1.8962243 C2.01412651,1.73573832 2.19503012,1.60216822 2.39415663,1.4995514 C2.59328313,1.39659813 2.80201807,1.32728972 3.05051205,1.28186916 C3.33677711,1.22971963 3.64391566,1.21525234 3.90698795,1.20818692 C4.05674699,1.20381308 4.20683735,1.20213084 4.35560241,1.2011215 L4.91123494,1.20011215 L49.9300602,1.20011215"
                      id="Fill-4"
                      fill="#FFFFFE"
                    />
                    <Path
                      d="M14.9712651,12.0028037 C15.4410843,11.4066168 15.759488,10.6058692 15.6756627,9.78762617 C14.9881627,9.82228037 14.149247,10.2478879 13.6635241,10.8447477 C13.2275,11.3558131 12.8418373,12.1902056 12.9422289,12.9744673 C13.7138855,13.0420935 14.4848795,12.5828411 14.9712651,12.0028037"
                      id="Fill-5"
                      fill="#000003"
                    />
                    <Path
                      d="M15.6667169,13.127215 C14.5461747,13.0595888 13.5932831,13.7731963 13.0581928,13.7731963 C12.5227711,13.7731963 11.7034036,13.1615327 10.8171084,13.1780187 C9.66343373,13.1951776 8.59292169,13.8576449 8.0078012,14.9110654 C6.80343373,17.018243 7.68972892,20.1445234 8.86096386,21.8607477 C9.42918675,22.7099439 10.1146988,23.6445981 11.0175602,23.6112897 C11.8707229,23.5773084 12.2050301,23.0504299 13.2420783,23.0504299 C14.2784639,23.0504299 14.5796386,23.6112897 15.4828313,23.5944673 C16.419488,23.5773084 17.0049398,22.7445981 17.573494,21.894729 C18.2258735,20.9267664 18.4925904,19.9921121 18.509488,19.9406355 C18.4925904,19.9234766 16.7037651,19.2266916 16.6871988,17.1370093 C16.6699699,15.3871402 18.0916867,14.5547664 18.1586145,14.5032897 C17.3558133,13.2974579 16.101747,13.1615327 15.6667169,13.127215"
                      id="Fill-6"
                      fill="#000003"
                    />
                    <Path
                      d="M22.6662952,17.4899439 L24.901747,17.4899439 C26.5981325,17.4899439 27.5632831,16.5626916 27.5632831,14.9551402 C27.5632831,13.3475888 26.5981325,12.4287477 24.9103614,12.4287477 L22.6662952,12.4287477 L22.6662952,17.4899439 Z M25.4239157,10.7592897 C27.859488,10.7592897 29.5552108,12.4640748 29.5552108,14.9460561 C29.5552108,17.4371215 27.8243675,19.1509907 25.3626205,19.1509907 L22.6662952,19.1509907 L22.6662952,23.5053084 L20.7177711,23.5053084 L20.7177711,10.7592897 L25.4239157,10.7592897 L25.4239157,10.7592897 Z"
                      id="Fill-7"
                      fill="#000003"
                    />
                    <Path
                      d="M35.9706627,20.0250841 L35.9706627,19.2922991 L33.7179819,19.4336075 C32.5957831,19.5130093 31.9606325,20.0163364 31.9606325,20.8113645 C31.9606325,21.6238879 32.6219578,22.1537944 33.6308434,22.1537944 C34.9442169,22.1537944 35.9706627,21.2352897 35.9706627,20.0250841 Z M30.0644578,20.8641869 C30.0644578,19.2388037 31.2906928,18.2408972 33.4658434,18.1170841 L35.9706627,17.967028 L35.9706627,17.2517383 C35.9706627,16.2181682 35.283494,15.6001121 34.1354518,15.6001121 C33.0480422,15.6001121 32.369488,16.1296822 32.2041566,16.9600374 L30.4299096,16.9600374 C30.5342771,15.2818318 31.9434036,14.0450467 34.2050301,14.0450467 C36.423253,14.0450467 37.840994,15.237757 37.840994,17.1013458 L37.840994,23.5053084 L36.040241,23.5053084 L36.040241,21.9771589 L35.9971687,21.9771589 C35.4663855,23.010729 34.3093976,23.6644486 33.109006,23.6644486 C31.3171988,23.6644486 30.0644578,22.5336449 30.0644578,20.8641869 L30.0644578,20.8641869 Z"
                      id="Fill-8"
                      fill="#000003"
                    />
                    <Path
                      d="M39.5410241,26.9239626 L39.5410241,25.3779813 C39.6798494,25.4133084 39.9929518,25.4133084 40.1496687,25.4133084 C41.0193976,25.4133084 41.4892169,25.0422056 41.7761446,24.0883738 C41.7761446,24.0708785 41.9414759,23.5231402 41.9414759,23.5140561 L38.6361747,14.2129346 L40.671506,14.2129346 L42.9854819,21.7742804 L43.0202711,21.7742804 L45.334247,14.2129346 L47.3175602,14.2129346 L43.89,23.9911402 C43.1070783,26.244 42.2025602,26.9680374 40.3063855,26.9680374 C40.1496687,26.9680374 39.6798494,26.9502056 39.5410241,26.9239626"
                      id="Fill-9"
                      fill="#000003"
                    />
                  </G>
                </G>
              </G>
            </G>
          </Svg>
        );

      case 'creditCard':
      case 'other':
        return (
          <Svg width={width ?? 48} height={height ?? 37} viewBox="0 0 48 37">
            <G
              id="Page-1"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd">
              <G
                id="Choose-Payment-Method"
                transform="translate(-295.000000, -418.000000)">
                <G id="Group-2" transform="translate(295.000000, 418.000000)">
                  <Path
                    d="M44.8695652,36.2850242 L3.13043478,36.2850242 C1.4013913,36.2850242 0,34.8517657 0,33.0834044 L0,3.20161978 C0,1.43325845 1.4013913,-2.84217094e-14 3.13043478,-2.84217094e-14 L44.8695652,-2.84217094e-14 C46.5986087,-2.84217094e-14 48,1.43325845 48,3.20161978 L48,33.0834044 C48,34.8517657 46.5986087,36.2850242 44.8695652,36.2850242 Z"
                    id="Shape"
                    fill="#E7E7E7"
                  />
                  <G
                    id="Group"
                    transform="translate(6.000000, 26.000000)"
                    fill={White}>
                    <Polygon
                      id="Rectangle-path"
                      points="-6.06181771e-14 0 4 0 4 4 0 4"
                    />
                    <Polygon
                      id="Rectangle-path"
                      points="5.6 0 9.6 0 9.6 4 5.6 4"
                    />
                    <Polygon
                      id="Rectangle-path"
                      points="13.6 0 17.6 0 17.6 4 13.6 4"
                    />
                    <Polygon
                      id="Rectangle-path"
                      points="19.2 0 23.2 0 23.2 4 19.2 4"
                    />
                    <Polygon
                      id="Rectangle-path"
                      points="27.2 0 31.2 0 31.2 4 27.2 4"
                    />
                    <Polygon
                      id="Rectangle-path"
                      points="32.8 0 36.8 0 36.8 4 32.8 4"
                    />
                  </G>
                  <Polygon
                    id="Rectangle-path"
                    fill="#9BA3AE"
                    points="6 8 18 8 18 17 6 17"
                  />
                </G>
              </G>
            </G>
          </Svg>
        );

      case 'debitCard':
        return (
          <Svg width={width ?? 26} height={height ?? 20} viewBox="0 0 26 20">
            <G
              id="Symbols"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd">
              <G id="Icons/Card">
                <G id="credit-card" transform="translate(-0.000000, 0.000000)">
                  <Path
                    d="M24.3043478,19.6135266 L1.69565217,19.6135266 C0.759086957,19.6135266 -2.13162821e-14,18.8387923 -2.13162821e-14,17.8829213 L-2.13162821e-14,1.73060529 C-2.13162821e-14,0.7747343 0.759086957,0 1.69565217,0 L24.3043478,0 C25.240913,0 26,0.7747343 26,1.73060529 L26,17.8829213 C26,18.8387923 25.240913,19.6135266 24.3043478,19.6135266 Z"
                    id="Shape-2"
                    fill="#E7E7E7"
                  />
                  <Rect
                    id="Rectangle"
                    fill={White}
                    x="3"
                    y="11"
                    width="13"
                    height="3"
                  />
                  <Polygon
                    id="Rectangle-path"
                    fill="#9BA3AE"
                    points="0 3.43236715 26 3.43236715 26 7.84541063 0 7.84541063"
                  />
                </G>
              </G>
            </G>
          </Svg>
        );

      case 'paypal':
        return (
          <Svg
            width={width ?? 1280}
            height={height ?? 339.345}
            viewBox="0 0 338.667 89.785">
            <G transform="translate(936.898 -21.779)">
              <Path
                id="paypal-logo-icon1"
                d="M-908.37 39.734a2.59 2.59 0 0 0-2.556 2.185l-4.247 26.936c.198-1.258 1.282-2.185 2.556-2.185h12.445c12.525 0 23.153-9.137 25.095-21.519a20.76 20.76 0 0 0 .245-2.793c-3.183-1.669-6.922-2.624-11.019-2.624z"
                fill="#001c64"
              />
              <Path
                id="paypal-logo-icon2"
                d="M-874.832 42.359a20.76 20.76 0 0 1-.245 2.793c-1.942 12.382-12.571 21.519-25.095 21.519h-12.445c-1.273 0-2.358.926-2.556 2.185l-3.905 24.752-2.446 15.528a2.1 2.1 0 0 0 2.075 2.43h13.508a2.59 2.59 0 0 0 2.556-2.185l3.558-22.567a2.59 2.59 0 0 1 2.558-2.185h7.953c12.525 0 23.153-9.137 25.095-21.519 1.379-8.788-3.047-16.784-10.611-20.75z"
                fill="#0070e0"
              />
              <Path
                id="paypal-logo-icon3"
                d="M-923.716 21.779c-1.273 0-2.358.926-2.556 2.183l-10.6 67.216c-.201 1.276.785 2.43 2.077 2.43h15.719l3.903-24.752 4.247-26.936a2.59 2.59 0 0 1 2.556-2.185h22.519c4.098 0 7.836.956 11.019 2.624.218-11.273-9.084-20.58-21.873-20.58z"
                fill="#003087"
              />
              <Path
                id="paypal-logo-p"
                d="M-828.604 39.734c-.697 0-1.289.506-1.398 1.195l-8.068 51.165a1.31 1.31 0 0 0 1.294 1.513h9.568c.696 0 1.289-.507 1.398-1.195l2.37-15.025c.108-.688.701-1.195 1.398-1.195h8.699c10.164 0 18.792-7.416 20.368-17.465 1.589-10.134-6.328-18.971-17.549-18.993zm9.301 11.422h6.96c5.73 0 7.596 3.381 7.006 7.12-.59 3.747-3.488 6.507-9.031 6.507h-7.084zm45.788 3.478c-2.416.009-5.196.504-8.317 1.804-7.159 2.984-10.597 9.151-12.057 13.647 0 0-4.647 13.717 5.852 21.253 0 0 9.737 7.255 20.698-.447l-.189 1.203a1.31 1.31 0 0 0 1.292 1.513h9.083c.697 0 1.289-.507 1.398-1.195l5.525-35.038a1.31 1.31 0 0 0-1.292-1.515h-9.083c-.697 0-1.29.507-1.398 1.195l-.297 1.886s-3.967-4.333-11.216-4.306zm.297 11.067c1.043 0 1.997.144 2.853.419 3.919 1.258 6.141 5.023 5.498 9.104-.793 5.025-4.914 8.725-10.199 8.725-1.042 0-1.996-.143-2.853-.418-3.918-1.258-6.154-5.023-5.511-9.104.793-5.025 4.927-8.727 10.212-8.727z"
                fill={theme.dark ? White : '#003087'}
              />
              <Path
                id="paypal-logo-y"
                d="M-745.92 55.859c-.72 0-1.232.703-1.012 1.388l9.958 30.901-9.004 14.562c-.437.707.071 1.62.902 1.62h10.642a1.77 1.77 0 0 0 1.513-.854l27.811-46.007c.427-.707-.083-1.611-.909-1.611h-10.641a1.77 1.77 0 0 0-1.522.869l-10.947 18.482-5.557-18.345c-.181-.597-.732-1.006-1.355-1.006z"
                fill={theme.dark ? White : '#003087'}
              />
              <Path
                id="paypal-logo-pa"
                d="M-697.804 39.734c-.697 0-1.289.506-1.398 1.195l-8.068 51.165a1.31 1.31 0 0 0 1.294 1.513h9.568c.696 0 1.289-.507 1.398-1.195l2.37-15.025c.108-.688.701-1.195 1.398-1.195h8.699c10.164 0 18.791-7.416 20.366-17.465 1.59-10.134-6.326-18.971-17.547-18.993zm9.301 11.422h6.96c5.73 0 7.596 3.381 7.006 7.12-.59 3.747-3.487 6.507-9.031 6.507h-7.084zm45.787 3.478c-2.416.009-5.196.504-8.317 1.804-7.159 2.984-10.597 9.151-12.057 13.647 0 0-4.645 13.717 5.854 21.253 0 0 9.735 7.255 20.697-.447l-.189 1.203a1.31 1.31 0 0 0 1.294 1.513h9.082c.697 0 1.289-.507 1.398-1.195l5.527-35.038a1.31 1.31 0 0 0-1.294-1.515h-9.083c-.697 0-1.29.507-1.398 1.195l-.297 1.886s-3.967-4.333-11.216-4.306zm.297 11.067c1.043 0 1.997.144 2.853.419 3.919 1.258 6.141 5.023 5.498 9.104-.793 5.025-4.914 8.725-10.199 8.725-1.042 0-1.996-.143-2.853-.418-3.918-1.258-6.154-5.023-5.511-9.104.793-5.025 4.927-8.727 10.212-8.727z"
                fill={theme.dark ? White : '#0070e0'}
              />
              <Path
                id="paypal-logo-l"
                d="M-609.107 39.734c-.696 0-1.289.507-1.398 1.195l-8.07 51.163a1.31 1.31 0 0 0 1.294 1.515h9.568c.696 0 1.289-.507 1.398-1.195l8.068-51.165a1.31 1.31 0 0 0-1.292-1.513z"
                fill={theme.dark ? White : '#0070e0'}
              />
            </G>
          </Svg>
        );

      case 'venmo':
        return (
          <Svg
            width={width ?? 80}
            height={height ?? 80}
            viewBox="0 0 32 32"
            fill="#028DFF">
            <Path d="M5.255 12.959c0.224 0.359 0.319 0.724 0.319 1.187 0 1.48-1.267 3.401-2.292 4.761h-2.333l-0.948-5.625 2.052-0.203 0.495 4c0.469-0.745 1.041-1.933 1.041-2.745 0-0.437-0.083-0.745-0.203-1zM7.921 15.427c0.371 0 1.333-0.172 1.333-0.708 0-0.265-0.187-0.401-0.4-0.401-0.385 0-0.881 0.469-0.933 1.109zM7.88 16.495c0 0.667 0.36 0.932 0.855 0.932 0.531 0 1.025-0.135 1.692-0.468l-0.255 1.681c-0.464 0.224-1.188 0.376-1.891 0.376-1.776 0-2.417-1.068-2.417-2.428 0-1.749 1.043-3.604 3.177-3.604 1.172 0 1.839 0.656 1.839 1.579 0 1.464-1.907 1.932-3 1.943zM16.803 14.265c0 0.229-0.043 0.537-0.068 0.751l-0.615 3.891h-2l0.563-3.573 0.036-0.401c0-0.265-0.156-0.317-0.344-0.317-0.271 0-0.536 0.12-0.692 0.197l-0.641 4.095h-2l0.907-5.828h1.735l0.025 0.468c0.412-0.265 0.959-0.573 1.719-0.573 1.011 0 1.376 0.532 1.376 1.308zM22.735 13.615c0.572-0.401 1.104-0.641 1.864-0.641 1.016 0 1.375 0.532 1.375 1.308-0.004 0.245-0.025 0.489-0.067 0.735l-0.615 3.891h-2l0.572-3.641 0.032-0.292c0-0.291-0.161-0.359-0.365-0.359-0.239 0-0.489 0.104-0.667 0.197l-0.635 4.095h-2l0.573-3.652 0.025-0.281c0-0.291-0.161-0.359-0.359-0.359-0.272 0-0.521 0.12-0.699 0.197l-0.625 4.084h-2.009l0.916-5.817h1.708l0.068 0.484c0.401-0.297 0.932-0.589 1.651-0.589 0.641 0 1.043 0.267 1.256 0.641zM29.948 15.307c0-0.468-0.12-0.801-0.469-0.801-0.796 0-0.957 1.401-0.957 2.109 0 0.547 0.145 0.88 0.505 0.88 0.744 0 0.921-1.468 0.921-2.188zM26.479 16.531c0-1.837 0.991-3.557 3.215-3.557 1.692 0 2.307 1 2.307 2.376 0 1.812-0.959 3.692-3.255 3.692-1.693 0-2.267-1.109-2.267-2.511z" />
          </Svg>
        );

      default:
        return null;
    }
  };

  return renderSvg(paymentMethodId);
};

export default PaymentMethodIcon;
